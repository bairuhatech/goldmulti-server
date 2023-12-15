import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Order } from "./order.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { OrderDto } from "./dto/order.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { OrderItemsService } from "../ORDER_ITEMS/order_items.service";
import { OrderPaymentsService } from "../ORDER_PAYMENTS/order_payments.service";
import { OrderStatusService } from "../ORDER_STATUS/order_status.service";
import { groupProductsByStore } from "../shared/helpers/groupProductsbystore";
import { Transaction } from "sequelize";
import { User } from "../USERS/user.entity";
import { calculateTotalPrice } from "../shared/helpers/calculateTotal";
import { Products } from "../PRODUCTS/products.entity";
import { OrderItems } from "../ORDER_ITEMS/order_items.entity";
import { Store } from "../STORE/store.entity";
import { OrderStatus } from "../ORDER_STATUS/order_status.entity";
import { OrderPayments } from "../ORDER_PAYMENTS/order_payments.entity";
import { Address } from "../ADDRESS/address.entity";
import { CartServices } from "../CART/cart.services";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";
import { MailService } from "../MAILS/Mails.services";
import { ToUserOrderPlaced } from "../MAILS/templates/orders/toUser_OrderPlaced";
import { ToSellerOrderPlaced } from "../MAILS/templates/orders/toSeller_OrderPlaced";
import { OrderUpdateMail } from "../MAILS/templates/orders/order_Status_update";
import { take } from "rxjs";
import { UpdateOrderStatus } from "./dto/updateOrderStatus.dto";
import { getErrorMessage } from "../shared/helpers/errormessage";
@Injectable()
export class OrderService {
  constructor(
    @Inject("OrderRepository")
    private readonly OrderRepository: typeof Order,
    private readonly orderItemsService: OrderItemsService,
    private readonly orderPaymentsService: OrderPaymentsService,
    private readonly orderStatusService: OrderStatusService,
    private readonly cartService: CartServices,
    private readonly mailService: MailService
  ) {}

  async findOne(id: number) {
    try {
      const order = await this.OrderRepository.findByPk(id, {
        include: [
          {
            model: OrderItems,
            required: true,
            include: [
              {
                model: Products,
                required: true,
              },
              {
                model: ProductVariant,
                required: false,
              },
            ],
          },
          { model: OrderStatus, required: true },
          { model: OrderPayments, required: true },
          { model: Address, required: true },
          { model: User, required: true },
          { model: Store, required: true },
        ],
      });
      if (!order) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      return new DataResponseDto(order, true, "Successfully fetched");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  // async findWithPagination(pageOptionsDto: PageOptionsDto) {
  //   const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
  //   try {
  //     const allList = await this.OrderRepository.findAndCountAll({
  //       order: [["createdAt", pageOptionsDto.order]],
  //       limit: pageOptionsDto.take,
  //       offset: skip,
  //     });
  //     const data = allList.rows.map((item: Order) => new OrderDto(item));
  //     const itemCount = allList.count;
  //     const meta = new PageMetaDto({ pageOptionsDto, itemCount });
  //     return new DataResponseDtoPagination(data, true, "Success", meta);
  //   } catch (err) {
  //     return new DataResponseDto([], false, err.message);
  //   }
  // }

  async findAll(userId: number, pageOptionsDto: PageOptionsDto) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    try {
      const orders = await this.OrderRepository.findAndCountAll<Order>({
        order: [["createdAt", pageOptionsDto.order]],
        limit: pageOptionsDto.take,
        offset: skip,
        distinct: true,
        where: {
          userId: userId,
        },
        attributes: [
          "id",
          "userId",
          "storeId",
          "totalItems",
          "total",
          "discount",
          "grandTotal",
          "status",
          "createdAt",
        ],
        include: [
          {
            model: OrderItems,
            required: true,
            attributes: {
              exclude: ["orderId", "userId", "updatedAt"],
            },
            include: [
              {
                model: ProductVariant,
                required: false,
                attributes: [
                  "name",
                  "available",
                  "image",
                  "price",
                  "combination",
                ],
              },
            ],
          },
          { model: Store, required: true, attributes: ["id", "store_name"] },
        ],
        // logging: console.log,
      });
      const itemCount = orders.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(orders.rows, true, "success", meta);
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateOrderDto) {
    try {
      const result = await this.OrderRepository.sequelize.transaction(
        async (transaction: Transaction) => {
          const groupedProducts = groupProductsByStore(data.cart);
          const newOrders = [];
          for (const item of groupedProducts) {
            const order = new Order();
            order.userId = data.user?._id;
            order.addressId = data.address?.id;
            order.storeId = item.storeId;
            order.totalItems = item?.totalCount;
            order.paymentType = data.payment?.name;
            order.coupan = "";
            order.tax = 0;
            order.deliveryCharge = 0;
            order.discount = 0;
            order.total = item?.totalPrice;
            order.grandTotal = item?.grandTotal;
            order.status = "pending";
            const newOrder = await order.save({ transaction: transaction });
            const orderItems = await this.orderItemsService.create(
              newOrder.id,
              item?.products,
              transaction
            );
            const orderPayment = await this.orderPaymentsService.create(
              newOrder.id,
              data,
              transaction
            );
            const orderStatus = await this.orderStatusService.create(
              newOrder,
              "your order is getting processed.",
              transaction
            );
            const itemstoRemove = data?.cart?.map((item: any) => {
              if (isNaN(Number(item?.id)) == false) {
                return Number(item?.id);
              }
            });
            await this.cartService.removeFromCart(itemstoRemove, transaction);
            const obj = { newOrder, orderPayment, orderStatus, orderItems };
            newOrders.push(obj);
            const storeDetails = await Store.findByPk(item.storeId);
            const mailObj = {
              userEmail: data.user?.email,
              storeEmail: storeDetails?.email,
              orderId: newOrder?.id,
              totalPrice: item?.totalPrice,
              userName: data.user?.username,
              storeName: storeDetails?.store_name,
              address: data.address,
              deliveryCharge: newOrder?.deliveryCharge,
              tax: newOrder?.tax,
              status: newOrder?.status,
              orderItems,
            };
            let userMail = await ToUserOrderPlaced(mailObj);
            let storeMail = await ToSellerOrderPlaced(mailObj);
            this.mailService.sellerEmails(userMail);
            this.mailService.sellerEmails(storeMail);
          }
          return newOrders;
        }
      );
      return new DataResponseDto(result, true, "Success");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: UpdateOrderDto) {
    try {
      const order = await Order.findByPk(id);
      if (!order) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      order.addressId = data.addressId;
      order.status = data.status;
      const updated = await order.save();
      return new DataResponseDto(updated, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const order = await Order.findByPk(id);
      if (!order) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await order.destroy();
      return new DataResponseDto(order, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async findOrderByStore(storeId: number) {
    try {
      const orders = await this.OrderRepository.findAll({
        where: {
          storeId: storeId,
        },
        order: [["createdAt", "DESC"]],
        include: [{ model: User, required: true }],
      });
      return new DataResponseDto(orders, true, "Fetched succesfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async updateOrder(data: UpdateOrderStatus) {
    try {
      const result = await this.OrderRepository.sequelize.transaction(
        async (transaction: Transaction) => {
          const order: any = await this.OrderRepository.findByPk(data.orderId, {
            transaction,
          });
          if (!order) throw new Error("No Order found");
          order.status = data.status;
          await order.save({ transaction });
          await this.orderStatusService.create(order, data.remark, transaction);
          transaction.afterCommit(async () => {
            const user = await order.getUserDetails();
            const store = await order.getStoreDetails();
            const items = await order.getOrderItems();
            const addr = await order.getAddressDetails();
            let email = await OrderUpdateMail(order, user, store, items, addr);
            this.mailService.sellerEmails(email);
          });
          return order;
        }
      );
      return new DataResponseDto(result, true, "Succcessfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, getErrorMessage(err));
    }
  }
}

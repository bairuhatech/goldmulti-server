import { User } from "../user/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
// import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./orders.entity";
import { OrderDto } from "./dto/order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @Inject("OrderesRepository")
    private readonly ordersRepository: typeof Order
  ) {}

  async findAll() {
    const orders = await this.ordersRepository.findAll<Order>();
    return orders.map((order) => new OrderDto(order));
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findByPk<Order>(id, {
      include: [User],
    });
    if (!order) {
      throw new HttpException("No order found", HttpStatus.NOT_FOUND);
    }
    return new OrderDto(order);
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const order = new Order();
    order.order_id = createOrderDto.order_id;
    order.user_id = createOrderDto.user_id;
    order.total_items = createOrderDto.total_items;
    order.total = createOrderDto.total;
    order.GST = createOrderDto.GST;
    order.Ccharge = createOrderDto.Ccharge;
    order.delivery_charge = createOrderDto.delivery_charge;
    order.grandTotal = createOrderDto.grandTotal;
    order.user = createOrderDto.user;
    order.coupen = createOrderDto.coupen;
    order.address = createOrderDto.address;
    order.payments = createOrderDto.payments;
    order.seller_id = createOrderDto.seller_id;
    order.products = createOrderDto.products;
    order.status = createOrderDto.status;
    order.statusHistory = createOrderDto.statusHistory;
    order.delivery_date = createOrderDto.delivery_date;
    order.note = createOrderDto.note;
    order.createdAt = new Date();
    order.updatedAt = new Date();

    return order.save();
  }
}

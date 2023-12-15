import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Transaction } from "sequelize";
import { ordersProviders } from "../../backup/Orders/orders.providers";
import { OrderStatus } from "./order_status.entity";
import { getErrorMessage } from "../shared/helpers/errormessage";
import { CreateOrderStatusDto } from "./dto/createOrderStatus.dto";
import { OrderDto } from "../ORDER/dto/order.dto";

@Injectable()
export class OrderStatusService {
  async findAll(userId: number) {
    try {
      const allList = await OrderStatus.findAll<OrderStatus>({
        order: [["updatedAt", "DESC"]],
      });
      return new DataResponseDto(allList, true, "success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async create(item: OrderDto, remark: string, transaction: Transaction) {
    try {
      const orderStatus = new OrderStatus();
      orderStatus.orderId = item.id;
      orderStatus.status = item.status;
      orderStatus.remark = remark;
      const data = await orderStatus.save({ transaction: transaction });
      return data;
    } catch (err) {
      throw new Error("Failed to Add Order Status");
    }
  }
}

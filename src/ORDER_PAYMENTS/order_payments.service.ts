import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Transaction } from "sequelize";
import { OrderPayments } from "./order_payments.entity";

@Injectable()
export class OrderPaymentsService {
  async findAll(userId: number) {
    try {
      const allList = await OrderPayments.findAll<OrderPayments>(
        {
          where: {
            userId: userId,
          },
          order: [["updatedAt", "DESC"]],
        }
      );
      return new DataResponseDto(allList, true, "success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async create(id: number, item, transaction: Transaction) {
    try {
      const orderPayment = new OrderPayments();
      orderPayment.orderId = id;
      orderPayment.userId = item.user._id;
      orderPayment.paymentType = item.payment.name;
      orderPayment.status = "pending";
      const data = await orderPayment.save({ transaction: transaction });
      return data;
    } catch (err) {
      throw new Error("Failed to Add Order Payment");
    }
  }
}

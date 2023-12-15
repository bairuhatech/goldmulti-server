import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Transaction } from "sequelize";
import { OrderItems } from "./order_items.entity";

@Injectable()
export class OrderItemsService {
  async findAll(userId: number) {
    try {
      const allList = await OrderItems.findAll<OrderItems>({
        where: {
          userId: userId,
        },
        order: [["updatedAt", "DESC"]],
      });
      return new DataResponseDto(allList, true, "success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async create(orderId: number, item: any[], transaction: Transaction) {
    if (Array.isArray(item) && item.length) {
      const created = [];
      try {
        for (const product of item) {
          const orderItem = await OrderItems.create(
            {
              orderId,
              userId: product?.userId,
              productId: product?.productId,
              variantId: product?.variantId,
              quantity: product?.quantity,
              buyPrice: product?.buyPrice,
              totalPrice: product?.totalPrice,
              image: product?.image,
              price: product?.buyPrice,
              name: product?.name,
            },
            { transaction: transaction }
          );
          created.push(orderItem);
        }
        return created;
      } catch (err) {
        throw new Error("Failed to Add order items");
      }
    }
  }
}

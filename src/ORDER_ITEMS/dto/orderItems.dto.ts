import { ApiProperty } from "@nestjs/swagger";
import { OrderItems } from "../order_items.entity";
export class OrderItemsDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly orderId: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly productId: number;

  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly buyPrice: number;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly totalPrice: number;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly name: string;

  constructor(order_items: OrderItems) {
    this.id = order_items.id;
    this.orderId = order_items.orderId;
    this.userId = order_items.userId;
    this.productId = order_items.productId;
    this.quantity = order_items.quantity;
    this.buyPrice = order_items.buyPrice;
    this.price = order_items.price;
    this.totalPrice = order_items.totalPrice;
    this.image = order_items.image;
    this.name = order_items.name;
  }
}

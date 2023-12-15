import { ApiProperty } from "@nestjs/swagger";
import { CartTable } from "../cart.entity";

export class CartDto {
  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly productId: number;

  @ApiProperty()
  readonly variantId: number;

  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly buyPrice: number;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly totalPrice: number;

  @ApiProperty()
  readonly storeId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly combination: JSON;

  constructor(data: CartTable) {
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.buyPrice = data.buyPrice;
    this.totalPrice = data.totalPrice;
    this.storeId = data.storeId;
    this.variantId = data.variantId;
    this.image = data.image;
    this.name = data.name;
    this.combination=data.combination;
  }
}

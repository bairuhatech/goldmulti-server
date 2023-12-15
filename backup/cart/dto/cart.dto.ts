import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "../cart.entity";

export class CartDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly user_id: string;

  @ApiProperty()
  readonly product_id: string;

  @ApiProperty()
  readonly seller_id: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly size: string;

  @ApiProperty()
  readonly rentPrice: string;

  @ApiProperty()
  readonly buyPrice: string;

  @ApiProperty()
  readonly mrp: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly days: string;

  @ApiProperty()
  readonly form_date: string;

  @ApiProperty()
  readonly to_date: string;

  @ApiProperty()
  readonly quantity: Number;

  @ApiProperty()
  readonly list_rent: string;

  @ApiProperty()
  readonly grand_total: Number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(cart: Cart) {
    this._id = cart._id;
    this.user_id = cart.user_id;
    this.product_id = cart.product_id;
    this.seller_id = cart.seller_id;
    this.description = cart.description;
    this.image = cart.image;
    this.size = cart.size;
    this.rentPrice = cart.rentPrice;
    this.buyPrice = cart.buyPrice;
    this.mrp = cart.mrp;
    this.type = cart.type;
    this.days = cart.days;
    this.form_date = cart.form_date;
    this.to_date = cart.to_date;
    this.quantity = cart.quantity;
    this.list_rent = cart.list_rent;
    this.quantity = cart.quantity;
    this.list_rent = cart.list_rent;
    this.grand_total = cart.grand_total;

    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }
}

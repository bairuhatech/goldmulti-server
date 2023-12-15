import { ApiProperty } from "@nestjs/swagger";
import { Product_view } from "../product_view.entity";

export class Product_viewDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly product_id: string;

  @ApiProperty()
  readonly user_id: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(product_view: Product_view) {
    this._id = product_view._id;
    this.product_id = product_view.product_id;
    this.user_id = product_view.user_id;
   

    this.createdAt = product_view.createdAt;
    this.updatedAt = product_view.updatedAt;
  }
}

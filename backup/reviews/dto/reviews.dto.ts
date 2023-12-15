import { ApiProperty } from "@nestjs/swagger";
import { Reviews } from "../reviews.entity";

export class ReviewsDto {
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

  constructor(reviews: Reviews) {
    this._id = reviews._id;
    this.product_id = reviews.product_id;
    this.user_id = reviews.user_id;

    this.createdAt = reviews.createdAt;
    this.updatedAt = reviews.updatedAt;
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { Wishlist } from "../wishlists.entity";

export class WishlistDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly user_id: string;

  @ApiProperty()
  readonly profile_id: string;

  @ApiProperty()
  readonly status: Boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(post: Wishlist) {
    this._id = post._id;
    this.user_id = post.user_id;
    this.profile_id = post.profile_id;
    this.status = post.status;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}

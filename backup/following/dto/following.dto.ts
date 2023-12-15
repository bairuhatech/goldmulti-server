import { ApiProperty } from "@nestjs/swagger";
import { Following } from "../following.entity";

export class FollowingDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly user_id: string;

  @ApiProperty()
  profile_id: string;

  constructor(post: Following) {
    this._id = post._id;
    this.user_id = post.user_id;
    this.profile_id = post.profile_id;
  }
}

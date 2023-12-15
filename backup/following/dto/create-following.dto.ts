import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsDate } from "class-validator";

export class CreateFollowingDto {
  @ApiProperty()
  @IsString()
  readonly user_id: string;

  @ApiProperty()
  @IsString()
  readonly profile_id: string;
}

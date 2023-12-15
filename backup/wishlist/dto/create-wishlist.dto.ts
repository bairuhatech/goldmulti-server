import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsDate, IsBoolean } from "class-validator";

export class CreateWishlistDto {
  @ApiProperty()
  @IsString()
  readonly user_id: string;

  @ApiProperty()
  @IsString()
  readonly profile_id: string;

  @ApiProperty()
  @IsBoolean()
  readonly status:  Boolean;

  

  @ApiProperty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  readonly updatedAt: Date;
}

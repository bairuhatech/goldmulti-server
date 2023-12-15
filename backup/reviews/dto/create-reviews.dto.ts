import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsNumber } from "class-validator";
import { Column, DataType } from "sequelize-typescript";

export class CreateReviewsDto {
  @ApiProperty()
  @IsString()
  readonly product_id: string;

  @ApiProperty()
  @IsString()
  readonly user_id: string;
}

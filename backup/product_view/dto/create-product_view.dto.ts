import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsNumber } from "class-validator";

export class CreateProduct_viewDto {
  @ApiProperty()
  @IsString()
  readonly product_id: string;

  @ApiProperty()
  @IsString()
  readonly user_id: string;
}

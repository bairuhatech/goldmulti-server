import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsNumber } from "class-validator";

export class CreateCartDto {
  @ApiProperty()
  @IsString()
  readonly user_id: string;

  @ApiProperty()
  @IsString()
  readonly product_id: string;

  @ApiProperty()
  @IsString()
  readonly seller_id: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsString()
  readonly image: string;

  @ApiProperty()
  @IsString()
  readonly size: string;

  @ApiProperty()
  @IsString()
  readonly rentPrice: string;

  @ApiProperty()
  @IsString()
  readonly buyPrice: string;

  @ApiProperty()
  @IsString()
  readonly mrp: string;

  @ApiProperty()
  @IsString()
  readonly type: string;

  @ApiProperty()
  @IsString()
  readonly days: string;

  @ApiProperty()
  @IsString()
  readonly form_date: string;

  @ApiProperty()
  @IsString()
  readonly to_date: string;

  @ApiProperty()
  @IsNumber()
  readonly quantity: Number;

  @ApiProperty()
  @IsString()
  readonly list_rent: string;

  @ApiProperty()
  @IsNumber()
  readonly grand_total: Number;
}

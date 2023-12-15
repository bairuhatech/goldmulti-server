import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsDate } from "class-validator";

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  readonly order_id: string;

  @ApiProperty()
  @IsString()
  readonly user_id: string;

  @ApiProperty()
  readonly total_items: Number;

  @ApiProperty()
  readonly total: Number;

  @ApiProperty()
  readonly GST: Number;

  @ApiProperty()
  readonly Ccharge: Number;
  @ApiProperty()
  readonly discount: Number;

  @ApiProperty()
  readonly delivery_charge: Number;

  @ApiProperty()
  readonly grandTotal: Number;

  @ApiProperty()
  readonly user: string;

  @ApiProperty()
  readonly coupen: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly payments: string;

  @ApiProperty()
  @IsString()
  readonly seller_id: string;

  @ApiProperty()
  @IsString()
  readonly products: string;

  @ApiProperty()
  @IsString()
  readonly status: string;

  @ApiProperty()
  @IsString()
  readonly statusHistory: string;

  @ApiProperty()
  readonly delivery_date: Date;

  @ApiProperty()
  readonly note: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

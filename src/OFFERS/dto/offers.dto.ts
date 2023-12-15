import { ApiProperty } from "@nestjs/swagger";
import { Offers } from "../offers.entity";

export class OffersDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly percentage: number;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly startDate: Date;

  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly type: string;

  constructor(offers: Offers) {
    this.id=offers.id;
    this.percentage = offers.percentage;
    this.amount = offers.amount;
    this.startDate = offers.startDate;
    this.endDate = offers.endDate;
    this.title = offers.title;
    this.image = offers.image;
    this.type = offers.type;
  }
}

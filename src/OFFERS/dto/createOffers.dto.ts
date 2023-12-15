import { ApiProperty } from "@nestjs/swagger";

export class CreateOffersDto {
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

}

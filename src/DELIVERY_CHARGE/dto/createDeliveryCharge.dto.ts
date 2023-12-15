import { ApiProperty } from "@nestjs/swagger";

export class CreateDeliveryChargeDto {

  @ApiProperty()
  readonly comparisonOperator: string;

  @ApiProperty()
  readonly value: string;

  @ApiProperty()
  readonly charge: string;
}

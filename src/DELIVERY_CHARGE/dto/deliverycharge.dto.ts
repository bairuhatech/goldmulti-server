import { ApiProperty } from "@nestjs/swagger";
import { DeliveryCharge } from "../deliverycharge.entity";

export class DeliveryChargeDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly comparisonOperator: string;

  @ApiProperty()
  readonly value: string;

  @ApiProperty()
  readonly charge: string;

  constructor(deliveryCharge: DeliveryCharge) {
    this.id = deliveryCharge.id;
    this.comparisonOperator = deliveryCharge.comparisonOperator;
    this.value = deliveryCharge.value;
    this.charge = deliveryCharge.charge;
  }
}

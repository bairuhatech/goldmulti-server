import { ApiProperty } from "@nestjs/swagger";
import { DistanceCharge } from "../distancecharge.entity";

export class DistanceChargeDto {
  @ApiProperty()
  readonly id: number;
  
  @ApiProperty()
  readonly distance: string;

  @ApiProperty()
  readonly operator: string;

  @ApiProperty()
  readonly charge: string;

  constructor(distanceCharge: DistanceCharge) {
    this.id = distanceCharge.id;
    this.distance = distanceCharge.distance;
    this.operator = distanceCharge.operator;
    this.charge = distanceCharge.charge;
  }
}
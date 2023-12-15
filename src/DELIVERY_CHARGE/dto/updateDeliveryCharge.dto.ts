import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateDeliveryChargeDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsOptional()
  readonly comparisonOperator: string;

  @ApiProperty()
  @IsOptional()
  readonly value: string;

  @ApiProperty()
  @IsOptional()
  readonly charge: string;
}

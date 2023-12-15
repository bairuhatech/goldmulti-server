import { ApiProperty } from "@nestjs/swagger";

export class CreateDistanceChargeDto {
  @ApiProperty()
  readonly distance: string;

  @ApiProperty()
  readonly operator: string;

  @ApiProperty()
  readonly charge: string;
}
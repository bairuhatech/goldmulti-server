import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateDistanceChargeDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsOptional()
  readonly distance: string;
  
  @ApiProperty()
  @IsOptional()
  readonly operator: string;

  @ApiProperty()
  @IsOptional()
  readonly charge: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsOptional } from "class-validator";

export class UpdateOffersDto {
  @IsOptional()
  @ApiProperty()
  readonly percentage: number;

  @IsOptional()
  @ApiProperty()
  readonly amount: number;

  @IsOptional()
  @ApiProperty()
  readonly startDate: Date;

  @IsOptional()
  @ApiProperty()
  readonly endDate: Date;

  @IsOptional()
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @ApiProperty()
  readonly image: string;

  @IsOptional()
  @ApiProperty()
  readonly type: string;
}

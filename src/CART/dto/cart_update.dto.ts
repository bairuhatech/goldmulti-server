import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsISO8601 } from "class-validator";

export class CartUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly quantity: number;

  @ApiProperty()
  @IsOptional()
  readonly price: number;
  
  @ApiProperty()
  readonly userId: number;
}

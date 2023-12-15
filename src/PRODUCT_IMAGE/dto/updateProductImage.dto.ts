import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateProductImageDto {
  @ApiProperty()
  @IsOptional()
  readonly url: string;

  @ApiProperty()
  @IsOptional()
  readonly productId: number;

  @ApiProperty()
  @IsOptional()
  readonly type: string;

  @ApiProperty()
  @IsOptional()
  readonly Key: string;
}

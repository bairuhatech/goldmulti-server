import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsNumber } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  readonly type: string;

  @ApiProperty()
  @IsString()
  readonly image: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly messgage: string;

  @ApiProperty()
  @IsString()
  readonly order_id: string;

  @ApiProperty()
  @IsString()
  readonly userref_id: string;

  @ApiProperty()
  @IsString()
  readonly status: Boolean;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UserPhoneUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phone: string;
}

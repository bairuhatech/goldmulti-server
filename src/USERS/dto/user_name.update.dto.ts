import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UserNameUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly first_name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly last_name: string;
}

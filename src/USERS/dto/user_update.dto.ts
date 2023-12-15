import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UserUpdateDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly password: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly first_name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly last_name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phone: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly type: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly role_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly store_id: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly countrycode: string;
}

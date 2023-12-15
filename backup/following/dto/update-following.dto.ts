import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsOptional } from "class-validator";

export class UpdateFollowingDto {
  @ApiProperty()
  @IsString()
  readonly user_id: string;

  @ApiProperty()
  @IsString()
  readonly City: string;

  @ApiProperty()
  @IsString()
  readonly Flat: string;

  @ApiProperty()
  @IsString()
  readonly Pincode: string;

  @ApiProperty()
  @IsString()
  readonly State: string;

  @ApiProperty()
  @IsString()
  readonly Street: string;

  @ApiProperty()
  @IsString()
  readonly aPhone: string;
}

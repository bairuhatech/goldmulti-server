import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateSettingsDto {
  @ApiProperty()
  @IsOptional()
  readonly type: string;

  @ApiProperty()
  @IsOptional()
  readonly isLocation: boolean;

  @ApiProperty()
  @IsOptional()
  readonly currency: string;

  @ApiProperty()
  @IsOptional()
  readonly adminEmail: string;

  @ApiProperty()
  @IsOptional()
  readonly supportInfoEmail: string;

  @ApiProperty()
  @IsOptional()
  readonly contactEmail: string;

  @ApiProperty()
  @IsOptional()
  readonly contactNumber: string;

  @ApiProperty()
  @IsOptional()
  readonly address: string;
}

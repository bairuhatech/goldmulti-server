import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateStoreDto {
  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  readonly phone: string;

  @ApiProperty()
  @IsOptional()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly business_location: string;

  @ApiProperty()
  @IsOptional()
  readonly business_type: string;

  @ApiProperty()
  @IsOptional()
  readonly agreement: string;

  @ApiProperty()
  @IsOptional()
  readonly trn_number: string;

  @ApiProperty()
  @IsOptional()
  readonly trade_lisc_no: string;

  @ApiProperty()
  @IsOptional()
  readonly attachment: string;

  @ApiProperty()
  @IsOptional()
  readonly seller_name: string;

  @ApiProperty()
  @IsOptional()
  readonly seller_country: string;

  @ApiProperty()
  @IsOptional()
  readonly birth_country: string;

  @ApiProperty()
  @IsOptional()
  readonly dob: Date;

  @ApiProperty()
  @IsOptional()
  readonly id_proof: string;

  @ApiProperty()
  @IsOptional()
  readonly id_issue_country: string;

  @ApiProperty()
  @IsOptional()
  readonly id_expiry_date: Date;

  @ApiProperty()
  @IsOptional()
  readonly store_name: string;

  @ApiProperty()
  @IsOptional()
  readonly upscs: string;

  @ApiProperty()
  @IsOptional()
  readonly manufacture: string;

  @ApiProperty()
  @IsOptional()
  readonly trn_upload: string;
  
  @ApiProperty()
  @IsOptional()
  readonly logo_upload: string;
  @ApiProperty()
  @IsOptional()
  readonly business_address: string;
  @ApiProperty()
  @IsOptional()
  readonly first_name: string;
  @ApiProperty()
  @IsOptional()
  readonly last_name: string;
  @ApiProperty()
  @IsOptional()
  readonly id_type: string;
  @ApiProperty()
  @IsOptional()
  readonly code: string;
  
  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly status_remark: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly business_location: string;

  @ApiProperty()
  readonly business_address: string;

  @ApiProperty()
  readonly business_type: string;

  @ApiProperty()
  readonly agreement: string;

  @ApiProperty()
  readonly trn_number: string;

  @ApiProperty()
  readonly trade_lisc_no: string;

  @ApiProperty()
  readonly seller_name: string;

  @ApiProperty()
  readonly seller_country: string;

  @ApiProperty()
  readonly birth_country: string;

  @ApiProperty()
  readonly dob: Date;

  @ApiProperty()
  readonly id_proof: string;

  @ApiProperty()
  readonly id_type: string;

  @ApiProperty()
  readonly id_issue_country: string;

  @ApiProperty()
  readonly id_expiry_date: Date;

  @ApiProperty()
  readonly store_name: string;

  @ApiProperty()
  readonly upscs: string;

  @ApiProperty()
  readonly manufacture: string;

  @ApiProperty()
  readonly trn_upload: string;

  @ApiProperty()
  readonly logo_upload: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly status_remark: string;

  @ApiProperty()
  readonly userId: number;
}

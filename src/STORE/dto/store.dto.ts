import { ApiProperty } from "@nestjs/swagger";
import { Store } from "../store.entity";

export class StoreDto {
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
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly status_remark: string;

  constructor(store: Store) {
    this.name = store.name;
    this.email = store.email;
    this.business_location = store.business_location;
    this.business_type = store.business_type;
    this.agreement = store.agreement;
    this.trn_number = store.trn_number;
    this.trade_lisc_no = store.trade_lisc_no;
    this.seller_name = store.seller_name;
    this.seller_country = store.seller_country;
    this.birth_country = store.birth_country;
    this.dob = store.dob;
    this.id_proof = store.id_proof;
    this.id_issue_country = store.id_issue_country;
    this.id_expiry_date = store.id_expiry_date;
    this.store_name = store.store_name;
    this.upscs = store.upscs;
    this.manufacture = store.manufacture;
    this.trn_upload = store.trn_upload;
    this.logo_upload = store.logo_upload;
    this.phone = store.phone;
    this.id = store.id;
    this.createdAt = store.createdAt;
    this.status = store.status;
    this.status_remark = store.status_remark;
    this.id_type = store.id_type;
    this.first_name = store.first_name;
    this.last_name = store.last_name;
    this.business_address = store.business_address;
    this.code=store.code;
  }
}

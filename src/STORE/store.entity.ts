import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  IsIn,
  IsEmail,
} from "sequelize-typescript";
import { Products } from "../PRODUCTS/products.entity";

@Table({ tableName: "STORE" })
export class Store extends Model<Store> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Column(DataType.STRING)
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phone: string;

  @Column(DataType.STRING)
  code: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  business_location: string;

  @Column(DataType.STRING)
  business_address: string;

  @Column(DataType.STRING)
  business_type: string;

  @Column(DataType.STRING)
  agreement: string;

  @Column(DataType.STRING)
  trn_number: string;

  @Column(DataType.STRING)
  trade_lisc_no: string;

  @Column(DataType.STRING)
  seller_name: string;

  @Column(DataType.STRING)
  seller_country: string;

  @Column(DataType.STRING)
  birth_country: string;

  @Column({
    type: DataType.DATE,
  })
  dob: Date;

  @Column(DataType.STRING)
  id_proof: string;

  @Column(DataType.STRING)
  id_type: string;

  @Column(DataType.STRING)
  id_issue_country: string;

  @Column(DataType.DATE)
  id_expiry_date: Date;

  @Column(DataType.STRING)
  store_name: string;

  @Column(DataType.STRING)
  upscs: string;

  @Column(DataType.STRING)
  manufacture: string;

  @Column(DataType.STRING)
  trn_upload: string;

  @Column(DataType.STRING)
  logo_upload: string;

  @IsIn({
    msg: "Invalid Status, Only Approve or Reject is Allowed",
    args: [["approved", "rejected", "pending"]],
  })
  @Column({ type: DataType.STRING })
  status: string;

  @Column(DataType.STRING)
  status_remark: string;

  @HasMany(() => Products)
  productList: Products[];
}

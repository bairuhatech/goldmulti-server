import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../USERS/user.entity";

@Table({ tableName: "ADDRESS" })
export class Address extends Model<Address> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  flat: string;
  
  @Column(DataType.STRING)
  fullAddress: string;

  @Column(DataType.STRING)
  pin_code: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  street: string;

  @Column(DataType.STRING)
  alt_phone: string;

  @Column(DataType.STRING)
  geo_location: string;

  @Column(DataType.STRING)
  type: string;

  @BelongsTo(() => User)
  userDetails: User;
}

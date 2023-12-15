import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Roles } from "../ROLES/roles.entity";
import { Store } from "../STORE/store.entity";

@Table({
  tableName: "USER",
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  _id: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    
  })
  username: string;

  @Column
  password: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  name!: string;

  @Unique
  @IsEmail
  @Column
  email!: string;

  @Column
  countrycode!: string;

  @Unique
  @Column
  phone!: string;

  @Column
  image!: string;

  @Column
  type!: string;

  @Column
  mail_verify: boolean;

  @Column
  phone_verify: boolean;

  @Column
  status: boolean;
  
  @Column(DataType.STRING)
  role: string;

  @ForeignKey(() => Roles)
  @Column(DataType.BIGINT)
  role_id: number;

  @ForeignKey(() => Store)
  @Column(DataType.BIGINT)
  store_id: number;

  @BelongsTo(() => Store)
  store: Store;
}

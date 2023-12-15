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

@Table({ tableName: "USER_VERIFY" })
export class UserVerify extends Model<UserVerify> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  userId: number;

  @Column({ type: DataType.STRING })
  token: string;

  @BelongsTo(() => User)
  userDetails: User;
}

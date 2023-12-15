import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Model,
  ForeignKey,
  Unique,
  Length,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user/user.entity";

@Table({
  tableName: "followings",
})
export class Following extends Model<Following> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  _id: string;

  @Column
  user_id: string;

  @Column
  profile_id: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: "deleted_at" })
  deletedAt: Date;
}

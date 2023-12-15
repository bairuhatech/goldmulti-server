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
  tableName: "notifications",
})
export class Notification extends Model<Notification> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  _id: string;

  @Column
  type: string;

  @Column
  image: string;

  @Column
  title: string;

  @Column
  messgage: string;

  @Column
  order_id: string;

  @Column
  userref_id: string;

  @Column
  status: Boolean;

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

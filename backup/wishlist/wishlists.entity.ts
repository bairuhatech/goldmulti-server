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
  tableName: "wishlist",
})
export class Wishlist extends Model<Wishlist> {
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

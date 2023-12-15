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
  tableName: "carts",
})
export class Cart extends Model<Cart> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  _id: string;

  @Column
  user_id: string;

  @Column
  product_id: string;

  @Column
  seller_id: string;

  @Column
  description: string;

  @Column
  image: string;

  @Column
  size: string;

  @Column
  rentPrice: string;

  @Column
  buyPrice: string;

  @Column
  mrp: string;

  @Column
  type: string;

  @Column
  days: string;

  @Column
  form_date: string;

  @Column
  to_date: string;

  @Column
  quantity: Number;

  @Column
  list_rent: string;

  @Column
  grand_total: Number;

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

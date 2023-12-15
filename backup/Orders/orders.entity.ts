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

@Table({
  tableName: "order",
})
export class Order extends Model<Order> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  _id: string;

  @Column
  order_id: string;

  @Column
  user_id: string;

  @Column
  total_items: Number;

  @Column
  total: Number;

  @Column
  GST: Number;

  @Column
  Ccharge: Number;

  @Column
  discount: Number;

  @Column
  delivery_charge: Number;

  @Column
  grandTotal: Number;

  @Column
  user: string;

  @Column
  coupen: string;

  @Column
  address: Object;

  @Column
  payments: Object;

  @Column
  seller_id: string;

  @Column
  products: string;

  @Column
  status: string;

  @Column
  statusHistory: string;

  @Column
  delivery_date: Date;

  @Column
  note: string;

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

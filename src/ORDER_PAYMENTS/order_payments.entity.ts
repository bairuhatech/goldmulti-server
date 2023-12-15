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
import { Order } from "../ORDER/order.entity";

@Table({ tableName: "ORDER_PAYMENTS" })
export class OrderPayments extends Model<OrderPayments> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  orderId: number;

  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  paymentType: string;

  @Column(DataType.STRING)
  status: string;

  @BelongsTo(() => Order)
  orderDetails: Order;
}

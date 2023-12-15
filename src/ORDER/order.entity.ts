import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  HasOne,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { OrderItems } from "../ORDER_ITEMS/order_items.entity";
import { OrderPayments } from "../ORDER_PAYMENTS/order_payments.entity";
import { OrderStatus } from "../ORDER_STATUS/order_status.entity";
import { User } from "../USERS/user.entity";
import { Address } from "../ADDRESS/address.entity";
import { Store } from "../STORE/store.entity";
@Table({ tableName: "ORDER" })
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: false })
  addressId: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  storeId: number;

  @Column(DataType.INTEGER)
  totalItems: number;

  @Column(DataType.STRING)
  paymentType: string;

  @Column(DataType.STRING)
  coupan: string;

  @Column(DataType.INTEGER)
  tax: number;

  @Column(DataType.INTEGER)
  deliveryCharge: number;

  @Column(DataType.INTEGER)
  discount: number;

  @Column(DataType.INTEGER)
  total: number;

  @Column(DataType.INTEGER)
  grandTotal: number;

  @Column(DataType.STRING)
  status: string;

  @BelongsTo(() => User)
  userDetails: User;

  @BelongsTo(() => Address)
  addressDetails: Address;

  @BelongsTo(() => Store)
  storeDetails: Store;

  @HasMany(() => OrderItems, { onDelete: "cascade", hooks: true })
  orderItems: OrderItems[];

  @HasOne(() => OrderPayments, { onDelete: "cascade", hooks: true })
  orderPayment: OrderPayments;

  @HasMany(() => OrderStatus, { onDelete: "cascade", hooks: true })
  orderStatus: OrderStatus[];
}

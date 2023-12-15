import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Order } from "../ORDER/order.entity";
  
  @Table({ tableName: "ORDER_STATUS" })
  export class OrderStatus extends Model<OrderStatus> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;
  
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId: number;

    @Column(DataType.STRING)
    status: string;

    @Column(DataType.STRING)
    remark: string;

    @BelongsTo(() => Order)
    orderDetails: Order;
  }
  
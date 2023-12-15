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
import { Products } from "../PRODUCTS/products.entity";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";

@Table({ tableName: "ORDER_ITEMS" })
export class OrderItems extends Model<OrderItems> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;

  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.INTEGER)
  buyPrice: number;

  @ForeignKey(() => Products)
  @Column({type:DataType.INTEGER,allowNull:false})
  productId: number;

  @ForeignKey(() => ProductVariant)
  @Column(DataType.INTEGER)
  variantId: number;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.INTEGER)
  price: number;

  @Column(DataType.INTEGER)
  totalPrice: number;

  @Column(DataType.STRING)
  image: string;

  @Column(DataType.STRING)
  name: string;

  @BelongsTo(() => Order)
  orderDetails: Order;

  @BelongsTo(() => Products)
  productDetails: Products;

  @BelongsTo(() => ProductVariant)
  variantDetails: ProductVariant;
}

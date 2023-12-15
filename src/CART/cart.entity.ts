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
import { Products } from "../PRODUCTS/products.entity";
import { Store } from "../STORE/store.entity";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";

@Table({
  tableName: "CART",
})
export class CartTable extends Model<CartTable> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Products)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.INTEGER, allowNull: true })
  variantId: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  storeId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  buyPrice: number;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @Column({ type: DataType.JSON, allowNull: true })
  combination: JSON;

  @Column(DataType.INTEGER)
  totalPrice: number;

  @BelongsTo(() => Products)
  productDetails: Products;

  @BelongsTo(() => Store)
  storeDetails: Store;

  @BelongsTo(() => ProductVariant)
  variantDetails: ProductVariant;
}

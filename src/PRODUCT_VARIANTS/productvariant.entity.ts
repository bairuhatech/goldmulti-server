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

@Table({ tableName: "PRODUCT_VARIANT" })
export class ProductVariant extends Model<ProductVariant> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column({type:DataType.STRING,allowNull:false})
  name: string;

  @ForeignKey(() => Products)
  @Column(DataType.INTEGER)
  productId: number;

  @Column(DataType.INTEGER)
  available: number;

  @Column({type:DataType.STRING,allowNull:false})
  barcode: string;

  @Column(DataType.STRING)
  image: string;

  @Column({type:DataType.INTEGER,allowNull:false})
  price: number;

  @Column({type:DataType.STRING,allowNull:false})
  sku: string;

  @Column(DataType.INTEGER)
  units: number;

  @Column(DataType.JSON)
  combination: JSON;

  @BelongsTo(() => Products)
  product: Products;
}

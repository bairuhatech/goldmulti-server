import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { Category } from "../CATEGORY/category.entity";
import { CartTable } from "../CART/cart.entity";
import { ProductImage } from "../PRODUCT_IMAGE/productimage.entity";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";
import { Store } from "../STORE/store.entity";

@Table({ tableName: "PRODUCTS" })
export class Products extends Model<Products> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  _id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column(DataType.STRING)
  image: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  bar_code: string;

  @Column({ type: DataType.STRING, allowNull: false,unique: true })
  sku: string;

  @Column(DataType.STRING)
  brand: string;

  @Column(DataType.BOOLEAN)
  bulk_order: boolean;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category: number;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.TEXT)
  specifications: string;

  @Column(DataType.STRING)
  manufacture: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  purchase_rate: number;

  @Column(DataType.INTEGER)
  retail_rate: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  status: boolean;

  @ForeignKey(() => SubCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  subCategory: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.INTEGER)
  unit: number;

  @Column(DataType.INTEGER)
  units: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  store_id: number;

  @Column(DataType.INTEGER)
  price: number;

  @BelongsTo(() => Category)
  categoryName: Category;

  @BelongsTo(() => SubCategory)
  subCategoryName: SubCategory;

  @BelongsTo(() => Store)
  storeDetails: Store;

  @HasMany(() => CartTable, { onDelete: "cascade", hooks: true })
  cartDetails: CartTable[];

  @HasMany(() => ProductImage, { onDelete: "cascade", hooks: true })
  productImages: ProductImage[];

  @HasMany(() => ProductVariant, { onDelete: "cascade", hooks: true })
  productVariant: ProductVariant[];
}

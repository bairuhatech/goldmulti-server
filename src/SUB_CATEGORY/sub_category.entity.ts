import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { Category } from "../CATEGORY/category.entity";
import { Products } from "../PRODUCTS/products.entity";

@Table({ tableName: "SUB_CATEGORY" })
export class SubCategory extends Model<SubCategory> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  _id: number;

  @Column({ type: DataType.STRING, unique: "key" })
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  image!: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.BIGINT, unique: "key", allowNull: false })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Products)
  products: Products[];
}

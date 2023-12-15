import {
  Table, Column, Model, DataType, PrimaryKey, AutoIncrement,
} from "sequelize-typescript";

@Table({ tableName: "PRODUCT_REVIEWS" })
export class ProductReviews extends Model<ProductReviews> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  _id: number;

  @Column({type:DataType.INTEGER,allowNull:false})
  product_id: number;

  @Column({type:DataType.INTEGER,allowNull:false})
  user_id: number;

  @Column(DataType.STRING)
  userName: string;

  @Column({type:DataType.STRING,allowNull:false})
  message: string;

  @Column(DataType.INTEGER)
  rating: number;
}

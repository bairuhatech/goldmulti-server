import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
} from "sequelize-typescript";

@Table({ tableName: "WISHLIST" })
export class Wishlist extends Model<Wishlist> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id: number;

	@Column(DataType.INTEGER)
	userId: number;

	@Column(DataType.INTEGER)
	productId: number;

	@Column({ type: DataType.STRING })
	description: string;
  
	@Column({ type: DataType.STRING })
	image: string;
  
	@Column({ type: DataType.INTEGER })
	buyPrice: number;

	@Column({ type: DataType.STRING })
	name: string;

	@Column({ type: DataType.INTEGER })
	sellerId: number;

}

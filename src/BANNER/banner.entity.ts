import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
} from "sequelize-typescript";

@Table({ tableName: "BANNER" })
export class Banner extends Model<Banner> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id: number;

	@Column({type:DataType.INTEGER,allowNull:false})
	storeId: number;

	@Column(DataType.STRING)
	title: string;

	@Column(DataType.STRING)
	description: string;

	@Column(DataType.STRING)
	img_mob: string;

	@Column(DataType.STRING)
	img_desk: string;

	@Column(DataType.BOOLEAN)
	status: boolean;
}

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({ tableName: "OFFERS" })
export class Offers extends Model<Offers> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 0,
      max: 100,
    },
  })
  percentage: number;

  @Column(DataType.INTEGER)
  amount: number;

  @Column(DataType.DATE)
  startDate: Date;

  @Column(DataType.DATE)
  endDate: Date;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  image: string;

  @Column(DataType.STRING)
  type: string;
}

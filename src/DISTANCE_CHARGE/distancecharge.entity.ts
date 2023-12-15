import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "DISTANCE_CHARGE" })
export class DistanceCharge extends Model<DistanceCharge> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;
  
  @Column(DataType.STRING)
  distance: string;

  @Column(DataType.STRING)
  operator: string;

  @Column(DataType.STRING)
  charge: string;
}

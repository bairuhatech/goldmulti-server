import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import sequelize from "sequelize";

@Table({ tableName: "ENQUIRY" })
export class Enquiry extends Model<Enquiry> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  message: string;
}

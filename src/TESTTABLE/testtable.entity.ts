import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { genSalt, hash } from "bcrypt";
const bcrypt = require("bcrypt");
@Table({ tableName: "TEST_TABLE" })
export class TestTable extends Model<TestTable> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.INTEGER })
  age: number;

  @Column({ type: DataType.DATE })
  dob: Date;

  @Column({
    type: DataType.STRING,
    async set(value: string) {
      const salt = bcrypt.genSaltSync();
      this.setDataValue("password", bcrypt.hashSync(value, salt));
    },
  })
  password: string;
}

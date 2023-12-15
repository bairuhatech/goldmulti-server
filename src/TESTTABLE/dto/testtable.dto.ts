import { ApiProperty } from "@nestjs/swagger";
import { TestTable } from "../testtable.entity";

export class TestTableDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly dob: Date;

  @ApiProperty()
  readonly password: string;

  constructor(testtable: TestTable) {
    this.id = testtable.id;
    this.name = testtable.name;
    this.email = testtable.email;
    this.phone = testtable.phone;
    this.age = testtable.age;
    this.dob = testtable.dob;
    this.password = testtable.password;
  }
}

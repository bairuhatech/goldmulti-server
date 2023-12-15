import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TestTable } from "./testtable.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateTestTableDto } from "./dto/createTestTable.dto";
import { TestTableDto } from "./dto/testtable.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { getErrorMessage } from "../shared/helpers/errormessage";
import { BusinessTypeService } from "../BUSINESS_TYPE/businesstype.service";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class TestTableService {
  constructor(
    @Inject("TestTableRepository")
    private readonly TestTableRepository: typeof TestTable
  ) {}

  async findAll() {
    try {
      const testtable = await this.TestTableRepository.findAll({});
      const data = testtable.map((item: TestTable) => new TestTableDto(item));
      return new DataResponseDto(data, true, "Successfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateTestTableDto) {
    try {
      const testtable = new TestTable();
      testtable.name = data.name;
      testtable.email = data.email;
      testtable.phone = data.phone;
      testtable.age = data.age;
      testtable.dob = data.dob;
      testtable.password = data.password;
      const created = await testtable.save();
      return new DataResponseDto(created, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async bulkCreate(data: CreateTestTableDto[]) {
    try {
      if (Array.isArray(data) == false || data.length == 0)
        throw new Error("Invalid Input");
      const array = data.map((item: CreateTestTableDto) => ({
        name: item.name,
        email: item.email,
        phone: item.phone,
        age: item.age,
        dob: item.dob,
      }));
      const created = await this.TestTableRepository.bulkCreate(array, {
        validate: true,
      });
      return new DataResponseDto(created, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto([], false, getErrorMessage(err));
    }
  }
}

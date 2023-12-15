import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { TestTableService } from "./testtable.service";
import { TestTableDto } from "./dto/testtable.dto";
import { CreateTestTableDto } from "./dto/createTestTable.dto";
// import { UpdateTestTableDto } from "./dto/updateTestTable.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("testtable")
@ApiTags("testtable")
export class TestTableController {
  constructor(private readonly testtableService: TestTableService) {}

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(TestTableDto)
  findAll(): Promise<DataResponseDto> {
    return this.testtableService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(TestTableDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateTestTableDto): Promise<DataResponseDto> {
    return this.testtableService.create(create);
  }

  @Post("bulk")
  @ApiDataArrayResponse(TestTableDto)
  @HttpCode(200)
  bulkCreate(@Body() create: CreateTestTableDto[]): Promise<DataResponseDto> {
    return this.testtableService.bulkCreate(create);
  }
}

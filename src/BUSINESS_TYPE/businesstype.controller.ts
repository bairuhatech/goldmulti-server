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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { BusinessTypeService } from "./businesstype.service";
import { BusinessTypeDto } from "./dto/businesstype.dto";
import { CreateBusinessTypeDto } from "./dto/createBusinessType.dto";
import { UpdateBusinessTypeDto } from "./dto/updateBusinessType.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("businesstype")
@ApiTags("businesstype")
export class BusinessTypeController {
  constructor(private readonly businesstypeService: BusinessTypeService) {}

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(BusinessTypeDto)
  findAll(): Promise<DataResponseDto> {
    return this.businesstypeService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(BusinessTypeDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateBusinessTypeDto): Promise<DataResponseDto> {
    return this.businesstypeService.create(create);
  }

  @Put(":id")
  @ApiDataObjectResponse(BusinessTypeDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() update: UpdateBusinessTypeDto
  ): Promise<DataResponseDto> {
    return this.businesstypeService.update(id, update);
  }

  @Delete(":id")
  @ApiDataObjectResponse(BusinessTypeDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.businesstypeService.delete(id);
  }
}

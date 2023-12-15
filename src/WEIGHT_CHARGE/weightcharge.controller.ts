import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode } from "@nestjs/common";
import { WeightChargeService } from "./weightcharge.service";
import { WeightChargeDto } from "./dto/weightcharge.dto";
import { CreateWeightChargeDto } from "./dto/createWeightCharge.dto";
import { UpdateWeightChargeDto } from "./dto/updateWeightCharge.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("weightcharge")
@ApiTags("weightcharge")
export class WeightChargeController {
  constructor(private readonly weightChargeService: WeightChargeService) {
  }

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(WeightChargeDto)
  findAll(): Promise<DataResponseDto> {
    return this.weightChargeService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(WeightChargeDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateWeightChargeDto[]): Promise<DataResponseDto> {
    console.log("Received payload:", create);
    return this.weightChargeService.create(create);
  }

  @Put()
  @ApiDataObjectResponse(WeightChargeDto)
  @ApiBearerAuth()
  update(@Body() updates: UpdateWeightChargeDto[]): Promise<DataResponseDto> {
    return this.weightChargeService.update(updates);
  }

  @Delete(":id")
  @ApiDataObjectResponse(WeightChargeDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.weightChargeService.delete(id);
  }
}

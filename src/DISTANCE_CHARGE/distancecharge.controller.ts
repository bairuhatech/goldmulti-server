import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode } from "@nestjs/common";
import { DistanceChargeService } from "./distancecharge.service";
import { DistanceChargeDto } from "./dto/distancecharge.dto";
import { CreateDistanceChargeDto } from "./dto/createDistanceCharge.dto";
import { UpdateDistanceChargeDto } from "./dto/updateDistanceCharge.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("distancecharge")
@ApiTags("distancecharge")
export class DistanceChargeController {
  constructor(private readonly distanceChargeService: DistanceChargeService) {
  }

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(DistanceChargeDto)
  findAll(): Promise<DataResponseDto> {
    return this.distanceChargeService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(DistanceChargeDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateDistanceChargeDto[]): Promise<DataResponseDto> {
    console.log("Received payload:", create);
    return this.distanceChargeService.create(create);
  }

  @Put()
  @ApiDataObjectResponse(DistanceChargeDto)
  @ApiBearerAuth()
    update(@Body() updates: UpdateDistanceChargeDto[]): Promise<DataResponseDto> {
    return this.distanceChargeService.update(updates);
  }

  @Delete(":id")
  @ApiDataObjectResponse(DistanceChargeDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.distanceChargeService.delete(id);
  }
}

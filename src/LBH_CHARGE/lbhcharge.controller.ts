import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode } from "@nestjs/common";
import { LbhChargeService } from "./lbhcharge.service";
import { LbhChargeDto } from "./dto/lbhcharge.dto";
import { CreateLbhChargeDto } from "./dto/createLbhCharge.dto";
import { UpdateLbhChargeDto } from "./dto/updateLbhCharge.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("lbhcharge")
@ApiTags("lbhcharge")
export class LbhChargeController {
  constructor(private readonly lbhChargeService: LbhChargeService) {
  }

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(LbhChargeDto)
  findAll(): Promise<DataResponseDto> {
    return this.lbhChargeService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(LbhChargeDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateLbhChargeDto[]): Promise<DataResponseDto> {
    console.log("Received payload:", create);
    return this.lbhChargeService.create(create);
  }

  @Put()
  @ApiDataObjectResponse(LbhChargeDto)
  @ApiBearerAuth()
  update(@Body() updates: UpdateLbhChargeDto[]): Promise<DataResponseDto> {
    return this.lbhChargeService.update(updates);
  }

  @Delete(":id")
  @ApiDataObjectResponse(LbhChargeDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.lbhChargeService.delete(id);
  }
}

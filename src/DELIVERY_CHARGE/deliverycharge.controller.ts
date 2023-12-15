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
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { DeliveryChargeService } from "./deliverycharge.service";
import { DeliveryChargeDto } from "./dto/deliverycharge.dto";
import { CreateDeliveryChargeDto } from "./dto/createDeliveryCharge.dto";
import { UpdateDeliveryChargeDto } from "./dto/updateDeliveryCharge.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("deliverycharge")
@ApiTags("deliverycharge")
export class DeliveryChargeController {
  constructor(private readonly deliveryChargeService: DeliveryChargeService) {}

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(DeliveryChargeDto)
  findAll(): Promise<DataResponseDto> {
    return this.deliveryChargeService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(DeliveryChargeDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateDeliveryChargeDto[]): Promise<DataResponseDto> {
    console.log("Received payload:", create);
    return this.deliveryChargeService.create(create);
  }

  @Put()
  @ApiDataObjectResponse(DeliveryChargeDto)
  @ApiBearerAuth()
  update(@Body() updates: UpdateDeliveryChargeDto[]): Promise<DataResponseDto> {
    console.log("Updated payload:", updates);
    return this.deliveryChargeService.update(updates);
  }
  

  @Delete(":id")
  @ApiDataObjectResponse(DeliveryChargeDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.deliveryChargeService.delete(id);
  }
}

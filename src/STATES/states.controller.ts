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

import { StatesService } from "./states.service";
import { StatesDto } from "./dto/states.dto";
import { CreateStatesDto } from "./dto/createStates.dto";
import { UpdateStatesDto } from "./dto/updateStates.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";


@Controller("states")
@ApiTags("states")
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiDataArrayResponse(StatesDto)
  findAll(): Promise<DataResponseDto> {
    return this.statesService.findAll();
  }

  @Post()
  @ApiDataObjectResponse(StatesDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateStatesDto): Promise<DataResponseDto> {
    return this.statesService.create(create);
  }

  @Put(":id")
  @ApiDataObjectResponse(StatesDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() update: UpdateStatesDto
  ): Promise<DataResponseDto> {
    return this.statesService.update(id, update);
  }

  @Delete(":id")
  @ApiDataObjectResponse(StatesDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.statesService.delete(id);
  }
}

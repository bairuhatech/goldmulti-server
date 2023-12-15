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
import { OffersDto } from "./dto/offers.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { OffersService } from "./offers.service";
import { CreateOffersDto } from "./dto/createOffers.dto";
import { UpdateOffersDto } from "./dto/updateOffers.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";

@Controller("offers")
@ApiTags("offers")
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [OffersDto] })
  findAll(@Query() pageOpt: PageOptionsDto): Promise<DataResponseDtoPagination> {
    return this.offersService.findAll(pageOpt);
  }

  @Get(":id")
  @ApiOkResponse({ type: [OffersDto] })
  @ApiParam({ name: "id", required: true })
  @HttpCode(200)
  findOne(@Param("id",new ParseIntPipe()) id: number): Promise<DataResponseDto> {
    return this.offersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: [OffersDto] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() offers: CreateOffersDto): Promise<DataResponseDto> {
    return this.offersService.create(offers);
  }

  @Put(":id")
  @ApiOkResponse({ type: OffersDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() createOffer: UpdateOffersDto
  ): Promise<DataResponseDto> {
    return this.offersService.update(id, createOffer);
  }

  @Delete(":id")
  @ApiOkResponse({ type: OffersDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.offersService.delete(id);
  }
}

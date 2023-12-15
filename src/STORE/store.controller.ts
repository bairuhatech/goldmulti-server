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
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { StoreService } from "./store.service";
import { StoreDto } from "./dto/store.dto";
import { CreateStoreDto } from "./dto/createStore.dto";
import { UpdateStoreDto } from "./dto/updateStore.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { UpdateStoreStatusDto } from "./dto/updateStatus.dto";
import { RequestDocumentMailDto } from "./dto/requestDocumentMail.dto";

@Controller("coorporate_store")
@ApiTags("coorporate_store")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get("pgn/:type")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [StoreDto] })
  @ApiParam({ name: "type", required: true })
  findAll(
    @Param("type") type: string,
    @Query() pageOpt: PageOptionsDto
  ): Promise<DataResponseDto> {
    return this.storeService.findAll(pageOpt,type);
  }

  @Get("by_user/:id")
  @ApiOkResponse({ type: [StoreDto] })
  @ApiParam({ name: "id", required: true })
  @HttpCode(200)
  findOne(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.storeService.findOne(id);
  }

  @Post("create")
  @ApiCreatedResponse({ type: [StoreDto] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateStoreDto): Promise<DataResponseDto> {
    return this.storeService.create(create);
  }

  @Post("send_mail")
  @ApiCreatedResponse({ type: [StoreDto] })
  @HttpCode(200)
  @ApiBearerAuth()
  requestDocumentMail(
    @Body() mail: RequestDocumentMailDto
  ): Promise<DataResponseDto> {
    return this.storeService.reqestDocumentMail(mail);
  }

  @Put(":id")
  @ApiOkResponse({ type: StoreDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() update: UpdateStoreDto
  ): Promise<DataResponseDto> {
    return this.storeService.update(update, id);
  }

  @Put("status/:id")
  @ApiOkResponse({ type: StoreDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  updateStatus(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() update: UpdateStoreStatusDto
  ): Promise<DataResponseDto> {
    return this.storeService.updateStatus(id, update);
  }

  @Delete("delete/:id")
  @ApiOkResponse({ type: StoreDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.storeService.delete(id);
  }
}

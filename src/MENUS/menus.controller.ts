import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { Menus } from "./menus.entity";
import { MenusDto } from "./dto/menus.dto";
import { CreateMenusDto } from "./dto/create.dto";
import { MenusService } from "./menus.services";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("menus")
@ApiTags("menus")
export class MenusController {
  constructor(private readonly MenusService: MenusService) {}

  @Get("all")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [MenusDto] })
  findAll(): any {
    return this.MenusService.findAll();
  }

  @Get("list")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [MenusDto] })
  async listAll(@Query() pageOpt: PageOptionsDto): Promise<any> {
    return await this.MenusService.listAll(pageOpt);
  }

  @Post("/create")
  @ApiCreatedResponse({ type: [Menus] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() createProductsDto: CreateMenusDto): Promise<DataResponseDto> {
    return this.MenusService.create(createProductsDto);
  }

  @Post("/sendInvite")
  @HttpCode(200)
  @ApiBearerAuth()
  inviteUser(@Body() data: any) {
    return this.MenusService.inviteUser(data);
  }

  @Delete(":id")
  @ApiOkResponse({ type: Menus })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(@Param("id", new ParseIntPipe()) id: number): any {
    return this.MenusService.delete(id);
  }
}

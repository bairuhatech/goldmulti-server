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

import { Roles } from "./roles.entity";
import { RolesDto } from "./dto/roles.dto";
import { CreateRolesDto } from "./dto/create.dto";
import { RolesService } from "./roles.services";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("roles")
@ApiTags("roles")
export class RolesController {
  constructor(private readonly RolesService: RolesService) {}

  @Get("all")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [RolesDto] })
  findAll(@Query() pageOpt: PageOptionsDto, @Query() role: any): any {
    return this.RolesService.findAll(pageOpt, role);
  }

  @Post("/create")
  @ApiCreatedResponse({ type: [Roles] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() createProductsDto: CreateRolesDto): Promise<DataResponseDto> {
    return this.RolesService.findOrCreate(createProductsDto);
  }

  @Delete("delete/:id")
  @ApiOkResponse({ type: Roles })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(@Param("id", new ParseIntPipe()) id: number): any {
    return this.RolesService.delete(id);
  }
}

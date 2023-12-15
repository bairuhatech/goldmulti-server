import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiPropertyOptional,
  ApiTags,
} from "@nestjs/swagger";

import { RolesConfigService } from "./rolesConfig.services";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { RolesConfigDto } from "./dto/rolesConfig.dto";

@Controller("rolesConfig")
@ApiTags("rolesConfig")
export class RolesConfigController {
  constructor(private readonly rolesConfigService: RolesConfigService) {}

  @Get("all")
  @ApiBearerAuth()
  @ApiOkResponse()
  findAll(@Query() pageOpt: PageOptionsDto): any {
    return this.rolesConfigService.findAll(pageOpt);
  }
  @Get("role/:id")
  @ApiBearerAuth()
  @ApiOkResponse()
  findMenusForRole(@Param("id") id: string): any {
    return this.rolesConfigService.findMenusForRole(id);
  }

  // @Get("users")
  // @ApiBearerAuth()
  // @ApiOkResponse()
  // @ApiParam({ name: "storeId", required: true })
  // findByStore(@Param("storeId", new ParseIntPipe()) storeId: number): any {
  //   return this.rolesConfigService.findByStore(storeId);
  // }
  @Post("create")
  @ApiCreatedResponse({ type: [RolesConfigDto] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: RolesConfigDto): any {
    return this.rolesConfigService.create(create);
  }

  @Post("create/update")
  @ApiCreatedResponse({ type: [RolesConfigDto] })
  @HttpCode(200)
  @ApiBearerAuth()
  createOrUpdate(@Body() create: RolesConfigDto): any {
    return this.rolesConfigService.updateOrCreate(create);
  }
}

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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { SettingsService } from "./settings.service";
import { SettingsDto } from "./dto/settings.dto";
import { CreateSettingsDto } from "./dto/createSettings.dto";
import { UpdateSettingsDto } from "./dto/updateSettings.dto";

@Controller("settings")
@ApiTags("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [SettingsDto] })
  findAll(): Promise<DataResponseDto> {
    return this.settingsService.findAll();
  }

  @Put(":id")
  @ApiOkResponse({ type: SettingsDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() update: UpdateSettingsDto
  ): Promise<DataResponseDto> {
    return this.settingsService.update(id, update);
  }
}

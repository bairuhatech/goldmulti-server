import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { LandingService } from "./landing.service";
import { BannerDto } from "../BANNER/dto/banner.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("landing")
@ApiTags("landing")
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Post("/home")
  login(@Body() data): any {
    return this.landingService.home();
  }
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [BannerDto] })
  findBanners(): Promise<DataResponseDto> {
    return this.landingService.findBanners();
  }
}

import {
  Controller,
  Req,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { CreateFollowingDto } from "./dto/create-following.dto";
import { FollowingsService } from "./followings.service";
import { AuthGuard } from "@nestjs/passport";
import { Following as FollowingEntity } from "./following.entity";
import { FollowingDto } from "./dto/following.dto";
import { UpdateFollowingDto } from "./dto/update-following.dto";

@Controller("following")
@ApiTags("Following")
export class FollowingsController {
  constructor(private readonly followingsService: FollowingsService) {}

  @Get()
  @ApiOkResponse({ type: [FollowingDto] })
  findAll(): Promise<FollowingDto[]> {
    return this.followingsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: FollowingDto })
  @ApiParam({ name: "id", required: true })
  findOne(@Param("id", new ParseIntPipe()) id: number): Promise<FollowingDto> {
    return this.followingsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: FollowingEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  create(
    @Body() createFollowingDto: CreateFollowingDto,
    @Req() request
  ): Promise<FollowingEntity> {
    return this.followingsService.create(request.user.id, createFollowingDto);
  }
}

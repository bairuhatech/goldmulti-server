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
import { CreateReviewsDto } from "./dto/create-reviews.dto";
import { ReviewsService } from "./reviews.service";
import { AuthGuard } from "@nestjs/passport";
import { ReviewsDto } from "./dto/reviews.dto";
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { Reviews } from "./reviews.entity";

@Controller("reviews")
@ApiTags("reviews")
export class ReviewsController {
  constructor(private readonly reviewssService: ReviewsService) {}

  @Get()
  @ApiOkResponse({ type: [ReviewsDto] })
  findAll(): Promise<ReviewsDto[]> {
    return this.reviewssService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: ReviewsDto })
  @ApiParam({ name: "id", required: true })
  findOne(@Param("id", new ParseIntPipe()) id: number): Promise<ReviewsDto> {
    return this.reviewssService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Reviews })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  create(
    @Body() createReviewsDto: CreateReviewsDto,
    @Req() request
  ): Promise<Reviews> {
    return this.reviewssService.create(createReviewsDto);
  }
}

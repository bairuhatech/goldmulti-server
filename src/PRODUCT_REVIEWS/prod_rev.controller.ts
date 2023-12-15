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
import { ProductReviews } from "./prod_rev.entity";
import { ProductReviewsDto } from "./dto/prod_rev.dto";
import { CreateProductReviewsDto } from "./dto/create.dto";
import { ProductReviewsService } from "./prod_rev.services";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageOptionsDtoReview } from "./dto/pageOptionReview.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";

@Controller("productsReviews")
@ApiTags("productsReviews")
export class ProductReviewsController {
  constructor(private readonly ProductReviewsService: ProductReviewsService) {}

  @Get("review")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ProductReviewsDto] })
  findByUserID(
    @Query() pageOpt: PageOptionsDtoReview
  ): Promise<DataResponseDtoPagination> {
    return this.ProductReviewsService.findAll(pageOpt);
  }

  @Get(":id")
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true })
  findOne(@Param("id") id: any): any {
    return this.ProductReviewsService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: [ProductReviews] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(
    @Body() createProductsDto: CreateProductReviewsDto
  ): Promise<DataResponseDto> {
    return this.ProductReviewsService.create(createProductsDto);
  }

  @Put(":id")
  @ApiOkResponse({ type: ProductReviews })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() createProductsDto: CreateProductReviewsDto
  ): Promise<DataResponseDto> {
    return this.ProductReviewsService.update(id, createProductsDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: ProductReviews })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.ProductReviewsService.delete(id);
  }
}

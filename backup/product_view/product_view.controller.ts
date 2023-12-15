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
import { CreateProduct_viewDto } from "./dto/create-product_view.dto";
import { Product_viewsService } from "./product_view.service";
import { AuthGuard } from "@nestjs/passport";
import { Product_view as Product_viewEntity } from "./product_view.entity";
import { Product_viewDto } from "./dto/product_view.dto";
import { UpdateProduct_viewDto } from "./dto/update-product_view.dto";

@Controller("product_views")
@ApiTags("product_views")
export class Product_viewsController {
  constructor(private readonly product_viewsService: Product_viewsService) {}

  @Get()
  @ApiOkResponse({ type: [Product_viewDto] })
  findAll(): Promise<Product_viewDto[]> {
    return this.product_viewsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: Product_viewDto })
  @ApiParam({ name: "id", required: true })
  findOne(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<Product_viewDto> {
    return this.product_viewsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Product_viewEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  create(
    @Body() createProduct_viewDto: CreateProduct_viewDto,
    @Req() request
  ): Promise<Product_viewEntity> {
    return this.product_viewsService.create(createProduct_viewDto);
  }
}

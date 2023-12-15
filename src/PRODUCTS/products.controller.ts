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
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";

import { ProductsDto } from "./dto/products.dto";
import { CreateProductsDto } from "./dto/create.dto";
import { ProductsService } from "./products.services";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ProductsPayloadDto } from "./dto/productsPayload.dto";
import { ProductsByStoreDto } from "./dto/productsByStore.dto";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { UpdateProductsDto } from "./dto/updateProduct.dto";
import { UpdateProductImagePayloadDto } from "./dto/updateProductImage.dto";
import { UpdateProductStatusDto } from "./dto/updateProductStatus.dto";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";

@Controller("products")
@ApiTags("products")
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get("all")
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductsDto)
  findAll(@Query() pageOpt: PageOptionsDto): any {
    return this.ProductsService.findAll(pageOpt);
  }

  @Get("bystore")
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductsDto)
  findByStoreId(@Query() pageOpt: ProductsByStoreDto): any {
    return this.ProductsService.findByStore(pageOpt);
  }
  // @Post("bulk")
  // @ApiDataArrayResponse(ProductsDto)
  // @HttpCode(200)
  // bulkCreate(@Body() create: CreateProductsDto[]): Promise<DataResponseDto> {
  //   return this.ProductsService.bulkCreate(create);
  // }
  @Get(":id")
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true })
  @ApiDataObjectResponse(ProductsDto)
  findOne(@Param("id") id: any): any {
    return this.ProductsService.findById(id);
  }
  @Get("item/:id")
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true })
  @ApiDataObjectResponse(ProductsDto)
  findOne2(@Param("id") id: any): Promise<DataResponseDto> {
    return this.ProductsService.findOne(id);
  }

  @Post("create")
  @ApiBearerAuth()
  @ApiDataObjectResponse(ProductsDto)
  @HttpCode(201)
  create(
    @Body() createProductsDto: ProductsPayloadDto
  ): Promise<DataResponseDto> {
    return this.ProductsService.create(createProductsDto);
  }

  @Put("update/:id")
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  @ApiDataObjectResponse(ProductsDto)
  @HttpCode(200)
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateProduct: UpdateProductsDto
  ): Promise<DataResponseDto> {
    return this.ProductsService.updateProductDetails(id, updateProduct);
  }

  @Put("update_image/:id")
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  @ApiDataObjectResponse(ProductsDto)
  @HttpCode(200)
  updateProductImage(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateProductImg: UpdateProductImagePayloadDto
  ): Promise<DataResponseDto> {
    return this.ProductsService.updateProductImages(id, updateProductImg);
  }
  @Put("update_status/:id")
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  @ApiDataObjectResponse(ProductsDto)
  @HttpCode(200)
  updateProductStatus(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateStatus: UpdateProductStatusDto
  ): Promise<DataResponseDto> {
    return this.ProductsService.updateProductStatus(id, updateStatus);
  }

  @Delete("delete/:id")
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  @ApiDataObjectResponse(ProductsDto)
  @HttpCode(200)
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.ProductsService.delete(id);
  }
}

import { Body, Controller, Delete, Get, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProductImageService } from "./productimage.service";
import { ProductImageDto } from "./dto/productimage.dto";
import { CreateProductImageDto } from "./dto/createProductImage.dto";
import { UpdateProductImageDto } from "./dto/updateProductImage.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("productimage")
@ApiTags("productimage")
export class ProductImageController {
  constructor(private readonly productimageService: ProductImageService) {}

//   @Post()
//   @ApiDataObjectResponse(ProductImageDto)
//   @HttpCode(200)
//   @ApiBearerAuth()
//   create(@Body() create: CreateProductImageDto): Promise<DataResponseDto> {
//     return this.productimageService.create(create);
//   }
}

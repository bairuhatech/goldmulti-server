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
import { ProductVariantService } from "./productvariant.service";
import { ProductVariantDto } from "./dto/productvariant.dto";
import {
  AddNewProductVariantDto,
  CreateProductVariantDto,
} from "./dto/createProductVariant.dto";
import { UpdateProductVariantDto } from "./dto/updateProductVariant.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";

@Controller("productvariant")
@ApiTags("productvariant")
export class ProductVariantController {
  constructor(private readonly productvariantService: ProductVariantService) {}

  @Post("add_variants")
  @ApiDataArrayResponse(ProductVariantDto)
  @HttpCode(201)
  @ApiBearerAuth()
  create(
    @Body() { data, name, productId }: AddNewProductVariantDto
  ): Promise<DataResponseDto> {
    return this.productvariantService.addNewVariants(productId, name, data);
  }
  @Delete("delete/:id")
  @ApiOkResponse({ type: ProductVariantDto })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.productvariantService.deleteVariant(id);
  }
}

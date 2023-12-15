import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProductSearchServices } from "./product_search.service";
import { ProductsDto } from "../PRODUCTS/dto/products.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ProductSearchPageOptionsDto } from "./dto/product_search_bysubcategory_dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { ProductSearchByNameDto } from "./dto/product_search_byname_dto";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
@Controller("product_search")
@ApiTags("product_search")
export class ProductSearchController {
  constructor(private readonly ProductsService: ProductSearchServices) {}
  //search for products for both multi and single. params:keyword, type
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("search")
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductsDto)
  searchProduct(
    @Query() pageOpt: ProductSearchByNameDto
  ): Promise<DataResponseDto> {
    return this.ProductsService.getProductsByName(pageOpt);
  }
  //to get the product names for autocomplete params:keyword
  @Get("recomm/:name")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ProductsDto] })
  searchRecom(@Param("name") name: string): Promise<DataResponseDto> {
    return this.ProductsService.getRecommendations(name);
  }
  //to get the products for a selected subcategory params:subcategoryId
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("bysubcategory")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ProductsDto] })
  getProductsBySubcategory(
    @Query() pageOpt: ProductSearchPageOptionsDto
  ): Promise<DataResponseDtoPagination> {
    return this.ProductsService.getProductsBySubCategory(pageOpt);
  }
}

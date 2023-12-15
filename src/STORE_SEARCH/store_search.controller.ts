import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { ProductsDto } from "../PRODUCTS/dto/products.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { StoreSearchServices } from "./store_search.service";
import { ProductSearchByStoreAndName } from "./dto/prouct_search_by_store.dto";
import { StoreDto } from "../STORE/dto/store.dto";
import { ProductsBySubCategoryDto } from "./dto/product_search_by_subcategory.dto";
import { ProductsBySubCategoryOnStoreDto } from "./dto/products_by_subcategory.dto";
@Controller("store_search")
@ApiTags("store_search")
export class SearchStoreController {
  constructor(private readonly storeSearchService: StoreSearchServices) {}
  //to search for a keyword in a specific store. params:keyword, storeId
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("search")
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductsDto)
  searchStoreWithName(
    @Query() pageOpt: ProductSearchByStoreAndName
  ): Promise<DataResponseDto> {
    return this.storeSearchService.getProductsBySearch(pageOpt);
  }
  //to get all products grouped by store for a specific subcategory
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("subcategory")
  @ApiBearerAuth()
  @ApiDataArrayResponse(StoreDto)
  getProductsBySubcategory(@Query() pageOpt: ProductsBySubCategoryDto): any {
    return this.storeSearchService.getAllProductsBySubcategory(pageOpt);
  }
  //to get products inside a store for a specific subcategory
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("store/subcategory")
  @ApiBearerAuth()
  @ApiDataArrayResponse(ProductsDto)
  getProductsByStoreCategory(
    @Query() pageOpt: ProductsBySubCategoryOnStoreDto
  ): Promise<DataResponseDto> {
    return this.storeSearchService.getProductsForStoreByCategory(pageOpt);
  }
  //to get the store info and available subcategories for a single store
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("info/:id")
  @ApiBearerAuth()
  @ApiDataArrayResponse(SubCategory)
  getSubcategoriesByStore(@Param("id") id: number): Promise<DataResponseDto> {
    return this.storeSearchService.getStoreDetails(id);
  }
  //get all products in a store grouped by subcategory
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get("all/:id")
  @ApiBearerAuth()
  @ApiDataArrayResponse(SubCategory)
  getProductsByStoreForSubcategory(
    @Param("id") id: number
  ): Promise<DataResponseDto> {
    return this.storeSearchService.getAllProductsForStore(id);
  }
}

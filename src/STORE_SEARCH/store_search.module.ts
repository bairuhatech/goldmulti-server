import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CategoryModule } from "../CATEGORY/category.module";
import { SubCategoryModule } from "../SUB_CATEGORY/sub_category.module";
import { ProductsModule } from "../PRODUCTS/products.module";
import { StoreModule } from "../STORE/store.module";
import { StoreSearchServices } from "./store_search.service";
import { SearchStoreController } from "./store_search.controller";

@Module({
  imports: [
    ProductsModule,
    CategoryModule,
    SubCategoryModule,
    DatabaseModule,
    StoreModule,
  ],
  controllers: [SearchStoreController],
  providers: [StoreSearchServices],
  exports: [StoreSearchServices],
})
export class StoreSearchModule {}

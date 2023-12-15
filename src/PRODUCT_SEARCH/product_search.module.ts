import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ProductSearchController } from "./product_search.controller";
import { ProductSearchServices } from "./product_search.service";
import { CategoryModule } from "../CATEGORY/category.module";
import { SubCategoryModule } from "../SUB_CATEGORY/sub_category.module";
import { ProductsModule } from "../PRODUCTS/products.module";
import { StoreModule } from "../STORE/store.module";

@Module({
    imports: [ProductsModule,CategoryModule,SubCategoryModule,DatabaseModule,StoreModule],
    controllers: [ProductSearchController],
    providers: [ProductSearchServices],
    exports: [ProductSearchServices],
  })
  export class ProductSearchModule {}
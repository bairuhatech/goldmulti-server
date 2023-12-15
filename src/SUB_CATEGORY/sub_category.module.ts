import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

import { SubCategoryController } from "./sub_category.controller";
import { SubCategoryProviders } from "./sub_category.provider";
import { SubCategoryService } from "./sub_category.services";
import { ProductsModule } from "../PRODUCTS/products.module";
@Module({
  imports: [ProductsModule,DatabaseModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, ...SubCategoryProviders],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}

import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ProductsController } from "./products.controller";
import { ProductsProviders } from "./products.provider";
import { ProductsService } from "./products.services";
import { ProductImageModule } from "../PRODUCT_IMAGE/productimage.module";
import { ProductVariantModule } from "../PRODUCT_VARIANTS/productvariant.module";
@Module({
  imports: [ProductVariantModule,ProductImageModule,DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...ProductsProviders],
  exports: [ProductsService],
})
export class ProductsModule {}

import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ProductVariantController } from "./productvariant.controller";
import { ProductVariantService } from "./productvariant.service";
import { ProductVariantProvider } from "./productvariant.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [ProductVariantController],
  providers: [ProductVariantService, ...ProductVariantProvider],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}

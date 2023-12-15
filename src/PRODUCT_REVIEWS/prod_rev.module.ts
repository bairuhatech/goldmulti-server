import { Module } from "@nestjs/common";
import { ProductReviewsService } from "./prod_rev.services";
import { DatabaseModule } from "../database/database.module";
import { ProductReviewsProviders } from "./prod_rev.provider";
import { ProductReviewsController } from "./prod_rev.controller";
@Module({
  imports: [DatabaseModule],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService, ...ProductReviewsProviders],
  exports: [ProductReviewsService],
})
export class ProductReviewsModule {}

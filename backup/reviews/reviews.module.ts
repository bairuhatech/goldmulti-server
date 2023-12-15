import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { reviewsProviders } from "./reviews.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ...reviewsProviders],
  exports: [],
})
export class ReviewModule {}

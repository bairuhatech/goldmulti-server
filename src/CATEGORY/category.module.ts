import { Module } from "@nestjs/common";
import { CategoryService } from "./category.services";
import { CategoryProviders } from "./category.provider";
import { CategoryController } from "./category.controller";
import { DatabaseModule } from "../database/database.module";
@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...CategoryProviders],
  exports: [CategoryService],
})
export class CategoryModule {}

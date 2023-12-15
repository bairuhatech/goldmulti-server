import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OrderItemsProvider } from "./order_items.provider";
import { OrderItemsService } from "./order_items.service";
import { OrderItems } from "./order_items.entity";
import { OrderItemsController } from "./order_items.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, ...OrderItemsProvider],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}

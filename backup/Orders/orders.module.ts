import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { ordersProviders } from "./orders.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders],
  exports: [],
})
export class OrdersModule {}




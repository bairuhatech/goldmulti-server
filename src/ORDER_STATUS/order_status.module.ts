import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OrderStatusService } from "./order_status.service";
import { OrderStatusProvider } from "./order_status.provider";
import { OrderStatus } from "./order_status.entity";
import { OrderStatusController } from "./order_status.controller";
@Module({
  imports: [DatabaseModule],
  controllers: [OrderStatusController],
  providers: [OrderStatusService,...OrderStatusProvider],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}

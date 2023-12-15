import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OrderPayments } from "./order_payments.entity";
import { OrderPaymentsProvider } from "./order_payments.provider";
import { OrderPaymentsService } from "./order_payments.service";
import { OrderPaymentsController } from "./order_payments.controller";
@Module({
  imports: [DatabaseModule],
  controllers: [OrderPaymentsController],
  providers: [OrderPaymentsService, ...OrderPaymentsProvider],
  exports: [OrderPaymentsService],
})
export class OrderPaymentsModule {}

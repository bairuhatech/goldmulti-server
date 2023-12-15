import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderProvider } from "./order.provider";
import { OrderItemsModule } from "../ORDER_ITEMS/order_items.module";
import { OrderPaymentsModule } from "../ORDER_PAYMENTS/order_payments.module";
import { OrderStatusModule } from "../ORDER_STATUS/order_status.module";
import { CartModule } from "../CART/cart.module";
import { EmailModule } from "../MAILS/Mails.module";
@Module({
  imports: [
    DatabaseModule,
    OrderItemsModule,
    OrderPaymentsModule,
    OrderStatusModule,
    EmailModule,
    CartModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProvider],
  exports: [OrderService],
})
export class OrderModule {}

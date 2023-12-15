import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { DeliveryChargeController } from "./deliverycharge.controller";
import { DeliveryChargeService } from "./deliverycharge.service";
import { DeliveryChargeProvider } from "./deliverycharge.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveryChargeController],
  providers: [DeliveryChargeService, ...DeliveryChargeProvider],
  exports: [DeliveryChargeService],
})
export class DeliveryChargeModule {}

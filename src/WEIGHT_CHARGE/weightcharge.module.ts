import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { WeightChargeController } from "./weightcharge.controller";
import { WeightChargeService } from "./weightcharge.service";
import { WeightChargeProvider } from "./weightcharge.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [WeightChargeController],
  providers: [WeightChargeService, ...WeightChargeProvider],
  exports: [WeightChargeService],
})
export class WeightChargeModule {
}

import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { DistanceChargeController } from "./distancecharge.controller";
import { DistanceChargeService } from "./distancecharge.service";
import { DistanceChargeProvider } from "./distancecharge.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [DistanceChargeController],
  providers: [DistanceChargeService, ...DistanceChargeProvider],
  exports: [DistanceChargeService],
})
export class DistanceChargeModule {
}

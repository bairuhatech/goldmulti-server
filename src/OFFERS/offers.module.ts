import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OffersController } from "./offers.controller";
import { OffersService } from "./offers.service";
import { OffersProvider } from "./offers.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [OffersController],
  providers: [OffersService, ...OffersProvider],
  exports: [OffersService],
})
export class OffersModule {}

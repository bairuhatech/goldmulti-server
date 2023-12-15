import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { IndividualSellerController } from "./individualseller.controller";
import { IndividualSellerService } from "./individualseller.service";
import { IndividualSellerProvider } from "./individualseller.provider";
import { EmailModule } from "../MAILS/Mails.module";
import { SettingsModule } from "../SETTINGS/settings.module";

@Module({
  imports: [EmailModule,DatabaseModule,SettingsModule],
  controllers: [IndividualSellerController],
  providers: [IndividualSellerService, ...IndividualSellerProvider],
  exports: [IndividualSellerService],
})
export class IndividualSellerModule {}

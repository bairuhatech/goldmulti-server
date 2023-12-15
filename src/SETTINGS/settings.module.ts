import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { SettingsProvider } from "./settings.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [SettingsController],
  providers: [SettingsService, ...SettingsProvider],
  exports: [SettingsService],
})
export class SettingsModule {}

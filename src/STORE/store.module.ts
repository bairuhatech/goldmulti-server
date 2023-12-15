import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { StoreProvider } from "./store.provider";
import { EmailModule } from "../MAILS/Mails.module";
import { UserModule } from "../USERS/user.module";
import { SettingsModule } from "../SETTINGS/settings.module";

@Module({
  imports: [UserModule,EmailModule,DatabaseModule,SettingsModule],
  controllers: [StoreController],
  providers: [StoreService, ...StoreProvider],
  exports: [StoreService],
})
export class StoreModule {}

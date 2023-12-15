import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { MenusController } from "./menus.controller";
import { MenusProviders } from "./menus.provider";
import { MenusService } from "./menus.services";
import { EmailModule } from "../MAILS/Mails.module";
@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [MenusController],
  providers: [MenusService, ...MenusProviders],
  exports: [MenusService],
})
export class MenusModule {}

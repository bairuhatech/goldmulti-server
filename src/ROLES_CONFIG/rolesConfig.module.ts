import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { RolesConfigController } from "./rolesConfig.controller";
import { RolesConfigProviders } from "./rolesConfig.provider";
import { RolesConfigService } from "./rolesConfig.services";
import { MenusModule } from "../MENUS/menus.module";
@Module({
  imports: [DatabaseModule,MenusModule],
  controllers: [RolesConfigController],
  providers: [RolesConfigService, ...RolesConfigProviders],
  exports: [RolesConfigService],
})
export class RolesConfigModule {}

import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { RolesController } from "./roles.controller";
import { RolesProviders } from "./roles.provider";
import { RolesService } from "./roles.services";
@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RolesService, ...RolesProviders],
  exports: [RolesService],
})
export class RolesModule {}

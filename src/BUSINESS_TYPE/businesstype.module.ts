import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BusinessTypeController } from "./businesstype.controller";
import { BusinessTypeService } from "./businesstype.service";
import { BusinessTypeProvider } from "./businesstype.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService, ...BusinessTypeProvider],
  exports: [BusinessTypeService],
})
export class BusinessTypeModule {}

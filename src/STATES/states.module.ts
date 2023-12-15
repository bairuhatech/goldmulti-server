import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { StatesController } from "./states.controller";
import { StatesService } from "./states.service";
import { StatesProvider } from "./states.provider";


@Module({
  imports: [DatabaseModule],
  controllers: [StatesController],
  providers: [StatesService, ...StatesProvider],
  exports: [StatesService],
})
export class StatesModule {}

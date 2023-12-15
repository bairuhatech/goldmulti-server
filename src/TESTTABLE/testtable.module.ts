import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { TestTableController } from "./testtable.controller";
import { TestTableService } from "./testtable.service";
import { TestTableProvider } from "./testtable.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [TestTableController],
  providers: [TestTableService, ...TestTableProvider],
  exports: [TestTableService],
})
export class TestTableModule {}

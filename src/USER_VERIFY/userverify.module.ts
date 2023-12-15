import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserVerifyController } from "./userverify.controller";
import { UserVerifyService } from "./userverify.service";
import { UserVerifyProvider } from "./userverify.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [UserVerifyController],
  providers: [UserVerifyService, ...UserVerifyProvider],
  exports: [UserVerifyService],
})
export class UserVerifyModule {}

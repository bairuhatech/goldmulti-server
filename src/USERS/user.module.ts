import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

import { UserController } from "./user.controller";
import { UserProviders } from "./user.provider";
import { UserService } from "./user.services";
import { EmailModule } from "../MAILS/Mails.module";

@Module({
  imports: [EmailModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
})
export class UserModule {}

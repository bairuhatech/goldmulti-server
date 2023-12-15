import { Global, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { UserModule } from "../USERS/user.module";
import { EmailModule } from "../MAILS/Mails.module";
import { RolesConfigModule } from "../ROLES_CONFIG/rolesConfig.module";
import { UserVerifyModule } from "../USER_VERIFY/userverify.module";
@Global()
@Module({
  imports: [DatabaseModule, UserModule, EmailModule, RolesConfigModule,UserVerifyModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

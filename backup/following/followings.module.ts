import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { FollowingsController } from "./followings.controller";
import { FollowingsService } from "./followings.service";
import { followingsProviders } from "./followings.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [FollowingsController],
  providers: [FollowingsService, ...followingsProviders],
  exports: [],
})
export class FollowingsModule {}

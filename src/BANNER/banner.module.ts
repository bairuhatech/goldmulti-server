import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BannerController } from "./banner.controller";
import { BannerService } from "./banner.service";
import { BannerProviders } from "./banner.provider";
@Module({
	imports: [DatabaseModule],
	controllers: [BannerController],
	providers: [BannerService, ...BannerProviders],
	exports: [BannerService],
})
export class BannerModule {}

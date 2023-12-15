import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { WishlistController } from "./wishlist.controller";
import { WishlistsService } from "./wishlist.service";
import { wishlistsProviders } from "./wishlist.provider";

@Module({
	imports: [DatabaseModule],
	controllers: [WishlistController],
	providers: [WishlistsService, ...wishlistsProviders],
	exports: [],
})
export class WishlistsModule {}

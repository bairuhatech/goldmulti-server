import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { WishlistsController } from "./wishlists.controller";
import { WishlistsService } from "./wishlists.service";
import { wishlistsProviders } from "./wishlists.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [WishlistsController],
  providers: [WishlistsService, ...wishlistsProviders],
  exports: [],
})
export class WishlistsModule {}

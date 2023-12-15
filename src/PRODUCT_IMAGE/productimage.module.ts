import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ProductImageController } from "./productimage.controller";
import { ProductImageService } from "./productimage.service";
import { ProductImageProvider } from "./productimage.provider";
import { ImgcompressModule } from "../IMAGE_COMPRESS/img_compress.module";

@Module({
  imports: [ImgcompressModule,DatabaseModule],
  controllers: [ProductImageController],
  providers: [ProductImageService, ...ProductImageProvider],
  exports: [ProductImageService],
})
export class ProductImageModule {}

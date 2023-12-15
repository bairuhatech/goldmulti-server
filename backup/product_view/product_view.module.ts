import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { Product_viewsController } from './product_view.controller';
import { Product_viewsService } from './product_view.service';
import { product_viewsProviders } from './product_view.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [Product_viewsController],
    providers: [Product_viewsService, ...product_viewsProviders],
    exports: [],
})
export class Product_viewModule {}

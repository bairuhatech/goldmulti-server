import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartServices } from './cart.services';
import { CartProvider } from './cart.provider';
import { ProductsModule } from '../PRODUCTS/products.module';
@Module({
    imports: [ProductsModule,DatabaseModule],
    controllers: [CartController],
    providers: [CartServices,...CartProvider],
    exports: [CartServices],
})
export class CartModule {}

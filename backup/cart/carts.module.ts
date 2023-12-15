import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { cartsProviders } from './carts.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CartsController],
    providers: [CartsService, ...cartsProviders],
    exports: [],
})
export class CartModule {}

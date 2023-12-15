import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartsService } from './carts.service';
import { AuthGuard } from '@nestjs/passport';
import { Cart as CartEntity } from './cart.entity';
import { CartDto } from './dto/cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Get()
    @ApiOkResponse({ type: [CartDto] })
    findAll(): Promise<CartDto[]> {
        return this.cartsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CartDto })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<CartDto> {
        return this.cartsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: CartEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createCartDto: CreateCartDto,
        @Req() request,
    ): Promise<CartEntity> {
        return this.cartsService.create(request.user.id, createCartDto);
    }


}

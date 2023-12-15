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
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
// import { CreateOrderDto } from "./dto/create-Order.dto";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "@nestjs/passport";
import { Order as OrderEntity } from "./orders.entity";
import { OrderDto } from "./dto/order.dto";
import { CreateOrderDto } from "./dto/create-order.dto";
// import { OrderDto } from "./dto/Order.dto";
// import { UpdateOrderDto } from "./dto/update-Order.dto";

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll(): Promise<any[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')

    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
        return this.ordersService.findOne(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createCartDto: any,
        @Req() request,
    ): Promise<any> {
        return this.ordersService.create(request.user.id, createCartDto);
    }

  };   
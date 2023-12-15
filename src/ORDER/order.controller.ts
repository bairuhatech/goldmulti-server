import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { UpdateOrderStatus } from "./dto/updateOrderStatus.dto";

@Controller("order")
@ApiTags("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("all/:userId")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiParam({ name: "userId", required: true })
  @ApiOkResponse({ type: [OrderDto] })
  findAll(
    @Param("userId", ParseIntPipe) id: number,
    @Query() pageOptions: PageOptionsDto
  ): any {
    return this.orderService.findAll(id, pageOptions);
  }

  @Get("store/:id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [OrderDto] })
  findByStore(@Param("id", ParseIntPipe) id: number): any {
    return this.orderService.findOrderByStore(id);
  }

  @Get("get_one/:id")
  @ApiDataObjectResponse(OrderDto)
  @ApiParam({ name: "id", required: true })
  @HttpCode(200)
  findOne(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiDataObjectResponse(OrderDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateOrderDto): Promise<DataResponseDto> {
    return this.orderService.create(create);
  }

  @Post("update_status")
  @ApiDataObjectResponse(OrderDto)
  @HttpCode(200)
  @ApiBearerAuth()
  updateStatus(@Body() create: UpdateOrderStatus): Promise<DataResponseDto> {
    return this.orderService.updateOrder(create);
  }
}

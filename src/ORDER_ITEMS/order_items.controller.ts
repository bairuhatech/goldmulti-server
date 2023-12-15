import { Controller, Get, Query, Param, ParseIntPipe, HttpCode } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { OrderDto } from "backup/Orders/dto/order.dto";
import { OrderItemsService } from "./order_items.service";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { OrderItemsDto } from "./dto/orderItems.dto";

@Controller("orderItems")
@ApiTags("orderItems")
export class OrderItemsController {
  constructor(private readonly orderService: OrderItemsService) {}
  @Get("all/:id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [OrderItemsDto] })
  findAll(@Param("id", ParseIntPipe) id: number): any {
    return this.orderService.findAll(id);
  }
}

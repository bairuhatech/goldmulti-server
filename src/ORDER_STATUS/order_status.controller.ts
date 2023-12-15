import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  HttpCode,
  Post,
  Body,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
} from "@nestjs/swagger";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { OrderStatusDto } from "./dto/orderStatus.dto";
import { OrderStatusService } from "./order_status.service";
import { CreateOrderStatusDto } from "./dto/createOrderStatus.dto";

@Controller("orderStatus")
@ApiTags("orderStatus")
export class OrderStatusController {
  constructor(private readonly orderService: OrderStatusService) {}

  @Get("all/:id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [OrderStatusDto] })
  findAll(@Param("id", ParseIntPipe) id: number): any {
    return this.orderService.findAll(id);
  }
}

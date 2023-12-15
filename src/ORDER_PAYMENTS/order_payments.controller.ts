import { Controller, Get, Query, Param, ParseIntPipe, HttpCode } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { OrderPaymentsDto } from "./dto/orderPayments.dto";
import { OrderPaymentsService } from "./order_payments.service";
@Controller("payments")
@ApiTags("payments")
export class OrderPaymentsController {
  constructor(private readonly orderService: OrderPaymentsService) {}


  @Get("all/:id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [OrderPaymentsDto] })
  findAll(@Param("id", ParseIntPipe) id: number): any {
    return this.orderService.findAll(id);
  }

}
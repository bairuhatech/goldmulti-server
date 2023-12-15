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
  Query,
  HttpCode,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { CartDto } from "./dto/cart.dto";
import { CreateCartDto } from "./dto/cart_create.dto";
import { CartTable } from "./cart.entity";
import { CartServices } from "./cart.services";
import { CartUpdateDto } from "./dto/cart_update.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("cart")
@ApiTags("cart")
export class CartController {
  constructor(private readonly cartService: CartServices) {}

  @Get("user/:id")
  @ApiOkResponse({ type: [CartDto] })
  @ApiParam({ name: "id", required: true })
  @HttpCode(200)
  findCartByUserID(@Param("id",new ParseIntPipe()) id: number): Promise<DataResponseDto> {
    return this.cartService.findByUserId(id);
  }
  @Post()
  @ApiCreatedResponse({ type: [CartTable] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() createCart: CreateCartDto): Promise<DataResponseDto> {
    return this.cartService.create(createCart);
  }
  @Put(':id')
  @ApiOkResponse({ type: [CartDto] })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  update(
      @Param('id', new ParseIntPipe()) id: number,
      @Body() updateCart: CartUpdateDto,
  ): Promise<DataResponseDto> {
      return this.cartService.update(id, updateCart);
  }
  @Delete(":id")
  @ApiOkResponse({ type: CartTable })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.cartService.delete(id);
  }
}

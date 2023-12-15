import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { WishlistDto } from "./dto/wishlist.dto";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { WishlistsService } from "./wishlist.service";
import { Wishlist } from "./wishlist.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDtoWishlist } from "./dto/pageOptionsWishlist.dto";

@Controller("wishlist")
@ApiTags("wishlist")
export class WishlistController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get("all")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [WishlistDto] })
  findAll(
    @Query() pageOpt: PageOptionsDtoWishlist
  ): Promise<DataResponseDto> {
    return this.wishlistsService.findAllWithUserId(pageOpt);
  }
  @Get("check/:userId/:productID")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [WishlistDto] })
  checkIfExist(
    @Param("userId", new ParseIntPipe()) userId: number,
    @Param("productID", new ParseIntPipe()) productId: number
  ): Promise<DataResponseDto> {
    return this.wishlistsService.checkIfExist(userId, productId);
  }
  @Get(":id")
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true })
  findOne(@Param("id") id: any): any {
    return this.wishlistsService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: [Wishlist] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(
    @Body() createWishlistDto: CreateWishlistDto
  ): Promise<DataResponseDto> {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Put(":id")
  @ApiOkResponse({ type: Wishlist })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() createWishlistDto: CreateWishlistDto
  ): Promise<DataResponseDto> {
    return this.wishlistsService.update(id, createWishlistDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: Wishlist })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.wishlistsService.delete(id);
  }
}

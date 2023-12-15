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
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { WishlistsService } from "./wishlists.service";
import { AuthGuard } from "@nestjs/passport";
import { Wishlist as WishlistsEntity } from "./wishlists.entity";
import { WishlistDto } from "./dto/wishlist.dto";
// import { UpdateWishlistsDto } from "./dto/update-wishlist.dto";

@Controller("wishlists")
@ApiTags("Wishlists")
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  @ApiOkResponse({ type: [WishlistDto] })
  findAll(): Promise<WishlistDto[]> {
    return this.wishlistsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: WishlistDto })
  @ApiParam({ name: "id", required: true })
  findOne(@Param("id", new ParseIntPipe()) id: number): Promise<WishlistDto> {
    return this.wishlistsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: WishlistsEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  create(
    @Body() createWishlistsDto: CreateWishlistDto,
    @Req() request
  ): Promise<WishlistsEntity> {
    return this.wishlistsService.create(request.user.id, createWishlistsDto);
  }
}

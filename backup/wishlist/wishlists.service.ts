import { User } from "../users/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { Wishlist } from "./wishlists.entity";
import { WishlistDto } from "./dto/wishlist.dto";
// import { UpdateWishlistDto } from "./dto/update-wishlist.dto";

@Injectable()
export class WishlistsService {
  constructor(
    @Inject("WishlistsRepository")
    private readonly wishlistsRepository: typeof Wishlist
  ) {}

  async findAll() {
    const wishlists = await this.wishlistsRepository.findAll<Wishlist>();
    return wishlists.map((wishlist) => new WishlistDto(wishlist));
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistsRepository.findByPk<Wishlist>(id, {
      include: [User],
    });
    if (!wishlist) {
      throw new HttpException("No wishlist found", HttpStatus.NOT_FOUND);
    }
    return new WishlistDto(wishlist);
  }

  async create(userId: string, createWishlistDto: CreateWishlistDto) {
    const wishlist = new Wishlist();
    wishlist.user_id = createWishlistDto.user_id;
    wishlist.profile_id = createWishlistDto.profile_id;
    wishlist.status = createWishlistDto.status;
    wishlist.createdAt = new Date();
    wishlist.updatedAt = new Date();

    return wishlist.save();
  }
}

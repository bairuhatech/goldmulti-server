import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Wishlist } from "./wishlist.entity";
import { WishlistDto } from "./dto/wishlist.dto";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDtoWishlist } from "./dto/pageOptionsWishlist.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
@Injectable()
export class WishlistsService {
  constructor(
    @Inject("WishlistRepository")
    private readonly WishlistRepository: typeof Wishlist
  ) {}

  async findById(id: number) {
    try {
      const data = await this.WishlistRepository.findByPk<Wishlist>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }
  async findIfExist(userId: number, productId: number) {
    try {
      const data = await this.WishlistRepository.findOne<Wishlist>({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  }
  async checkIfExist(userId: number, productId: number) {
    try {
      const data = await this.WishlistRepository.findOne<Wishlist>({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      if (data) {
        return new DataResponseDto({ status: true }, true, "item found");
      } else {
        return new DataResponseDto({ status: false }, true, "not found");
      }
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async findAllWithUserId(pageOptionsDto: PageOptionsDtoWishlist) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    try {
      const allList = await this.WishlistRepository.findAndCountAll<Wishlist>({
        where: {
          userId: pageOptionsDto.userId,
        },
        limit: pageOptionsDto.take,
        offset: skip,
        order: [["createdAt", "DESC"]],
      });
      const data = allList.rows.map((item) => new WishlistDto(item));
      const itemCount = allList.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(data, true, "Success", meta);
    } catch (err) {
      return new DataResponseDtoPagination([], false, err.message, {});
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.WishlistRepository.findByPk<Wishlist>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async create(create: CreateWishlistDto) {
    try {
      const ifExist = await this.findIfExist(create?.userId, create?.productId);
      if (ifExist) {
        const item = await this.findById(ifExist.id);
        item.destroy();
        return new DataResponseDto(
          item,
          true,
          "Product Successfully removed from Wishlist"
        );
      }
      const wishlist = new Wishlist();
      wishlist.userId = create.userId;
      wishlist.productId = create.productId;
      wishlist.description = create.description;
      wishlist.image = create.image;
      wishlist.buyPrice = create.buyPrice;
      wishlist.sellerId = create.sellerId;
      wishlist.name = create.name;
      const createData = await wishlist.save();
      return new DataResponseDto(
        createData,
        true,
        `Successfully added ${create.name} to Wishlist`
      );
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: CreateWishlistDto) {
    try {
      const wishlist = await this.findById(id);
      wishlist.userId = data.userId;
      wishlist.productId = data.productId;
      wishlist.description = data.description;
      wishlist.image = data.image;
      wishlist.buyPrice = data.buyPrice;
      wishlist.sellerId = data.sellerId;
      wishlist.name = data.name;
      const updatedData = await wishlist.save();
      return new DataResponseDto(updatedData, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      await pkId.destroy();
      return new DataResponseDto(pkId, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

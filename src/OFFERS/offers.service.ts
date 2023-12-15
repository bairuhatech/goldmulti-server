import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Offers } from "./offers.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateOffersDto } from "./dto/createOffers.dto";
import { UpdateOffersDto } from "./dto/updateOffers.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { OffersDto } from "./dto/offers.dto";
@Injectable()
export class OffersService {
  constructor(
    @Inject("OffersRepository")
    private readonly OffersRepository: typeof Offers
  ) {}
  async findAll(pageOptionsDto: PageOptionsDto) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    try {
      const offers = await this.OffersRepository.findAndCountAll({
        order: [["updatedAt", "DESC"]],
        limit: pageOptionsDto.take,
        offset: skip,
      });
      const data = offers.rows.map((item: Offers) => new OffersDto(item));
      const itemCount = offers.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        data,
        true,
        "Successfully fetched",
        meta
      );
    } catch (err) {
      return new DataResponseDtoPagination([], false, err.message, {});
    }
  }
  async findOne(id: number) {
    try {
      const offer = await this.OffersRepository.findByPk(id);
      if (!offer) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      return new DataResponseDto(offer, true, "Successfully fetched");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async create(data: CreateOffersDto) {
    try {
      const offer = new Offers();
      offer.percentage = data.percentage;
      offer.amount = data.amount;
      offer.startDate = data.startDate;
      offer.endDate = data.endDate;
      offer.title = data.title;
      offer.image = data.image;
      offer.type = data.type;
      const offered = await offer.save();
      return new DataResponseDto(offered, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async update(id: number, data: UpdateOffersDto) {
    try {
      const offer = await Offers.findByPk(id);
      if (!offer) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      offer.percentage = data.percentage;
      offer.amount = data.amount;
      offer.startDate = data.startDate;
      offer.endDate = data.endDate;
      offer.title = data.title;
      offer.image = data.image;
      offer.type = data.type;
      await offer.save();
      return new DataResponseDto(offer, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async delete(id: number) {
    try {
      const offer = await Offers.findByPk(id);
      if (!offer) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await offer.destroy();
      return new DataResponseDto(offer, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

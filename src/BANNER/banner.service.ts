import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Banner } from "./banner.entity";
import { BannerDto } from "./dto/banner.dto";
import { CreateBannerDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { PageDto } from "../shared/dto/page.dto";
@Injectable()
export class BannerService {
  constructor(
    @Inject("BannerRepository")
    private readonly BannerRepository: typeof Banner
  ) {}

  async findById(id: number) {
    try {
      const data = await this.BannerRepository.findByPk<Banner>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const allList = await this.BannerRepository.findAndCountAll<Banner>({
        limit: pageOptionsDto.take,
        offset: skip,
        order: [["updatedAt", pageOptionsDto.order]],
      });
      const data = allList.rows.map((item) => new BannerDto(item));
      const itemCount = allList.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(data, true, "Success", pageMetaDto);
    } catch (err) {
      return new PageDto([], false, err.message, null);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.BannerRepository.findByPk<Banner>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }

  async create(create: CreateBannerDto) {
    try {
      const banner = new Banner();
      banner.storeId = create.storeId;
      banner.description = create.description;
      banner.img_desk = create.img_desk;
      banner.img_mob = create.img_mob;
      banner.status = create.status;
      banner.title = create.title;
      const createData = await banner.save();
      return new DataResponseDto(createData, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: CreateBannerDto) {
    try {
      const banner = await this.findById(id);
      banner.description = data.description;
      if (banner.img_desk) {
        banner.img_desk = data.img_desk;
      }
      banner.img_mob = data.img_mob;
      banner.status = data.status;
      banner.title = data.title;
      const updatedData = await banner.save();
      return new DataResponseDto(updatedData, true, "Successfully Updated");
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      if (!pkId)
        throw new HttpException("Unable find Item", HttpStatus.NOT_FOUND);
      await pkId.destroy();
      return new DataResponseDto(pkId, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

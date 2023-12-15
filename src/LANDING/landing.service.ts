import { Injectable } from "@nestjs/common";
import { Banner } from "../BANNER/banner.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
@Injectable()
export class LandingService {
  async home() {
    try {
      return "riyas";
    } catch (err) {
      console.log("err = = = = >", err);
    }
  }
  async findBanners() {
    try {
      const banners: Banner[] = await Banner.findAll({});
      return new DataResponseDto(banners, true, "Success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
}

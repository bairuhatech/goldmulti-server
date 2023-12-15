import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { DistanceCharge } from "./distancecharge.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateDistanceChargeDto } from "./dto/createDistanceCharge.dto";
import { UpdateDistanceChargeDto } from "./dto/updateDistanceCharge.dto";
import { DistanceChargeDto } from "./dto/distancecharge.dto";

@Injectable()
export class DistanceChargeService {
  constructor(
    @Inject("DistanceChargeRepository")
    private readonly distanceChargeRepository: typeof DistanceCharge
  ) {}

  async findAll() {
    try {
      const deliveryCharges = await this.distanceChargeRepository.findAll({});
      const data = deliveryCharges.map(
        (item: DistanceCharge) => new DistanceChargeDto(item)
      );
      return new DataResponseDto(data, true, "Successfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateDistanceChargeDto[]) {
    try {
      for (const item of data) {
        const distanceCharge = new DistanceCharge();
        if (!distanceCharge)
          throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
        if (item.operator !== undefined) {
          distanceCharge.operator = item.operator;
        }
        if (item.distance !== undefined) {
          distanceCharge.distance = item.distance;
        }
        if (item.charge !== undefined) {
          distanceCharge.charge = item.charge;
        }
        await distanceCharge.save();
      }
      return new DataResponseDto({}, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(data: UpdateDistanceChargeDto[]) {
    try {
      for (const item of data) {
        const distanceCharge = await DistanceCharge.findByPk(item.id);
        if (!distanceCharge)
          throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
        if (item.operator !== undefined) {
          distanceCharge.operator = item.operator;
        }
        if (item.distance !== undefined) {
          distanceCharge.distance = item.distance;
        }
        if (item.charge !== undefined) {
          distanceCharge.charge = item.charge;
        }
        await distanceCharge.save();
      }
      return new DataResponseDto({}, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const distanceCharge = await DistanceCharge.findByPk(id);
      if (!distanceCharge)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await distanceCharge.destroy();
      return new DataResponseDto(distanceCharge, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

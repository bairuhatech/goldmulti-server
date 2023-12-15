import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { WeightCharge } from "./weightcharge.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateWeightChargeDto } from "./dto/createWeightCharge.dto";
import { UpdateWeightChargeDto } from "./dto/updateWeightCharge.dto";
import { WeightChargeDto } from "./dto/weightcharge.dto";

@Injectable()
export class WeightChargeService {
  constructor(
    @Inject("WeightChargeRepository")
    private readonly weightChargeRepository: typeof WeightCharge
  ) {
  }

  async findAll() {
    try {
      const deliveryCharges = await this.weightChargeRepository.findAll({});
      const data = deliveryCharges.map(
        (item: WeightCharge) => new WeightChargeDto(item)
      );
      return new DataResponseDto(data, true, "Successfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateWeightChargeDto[]) {
    try {
      for (const item of data) {
    const weightCharge = new WeightCharge();
    if (item.operator !== undefined) {
      weightCharge.operator = item.operator;
    }
    if (item.weight !== undefined) {
      weightCharge.weight = item.weight;
    }
    if (item.charge !== undefined) {
      weightCharge.charge = item.charge;
    }
    await weightCharge.save();
      }
    return new DataResponseDto({}, true, "Successfully Created");
  } catch (err) {
    return new DataResponseDto({}, false, err.message);
  }
  }

  async update(data: UpdateWeightChargeDto[]) {
    try {
      for (const item of data) {
      const weightCharge = await WeightCharge.findByPk(item.id);
      if (!weightCharge)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      // weightCharge.weight = data.weight;
      // weightCharge.operator = data.operator;
      // weightCharge.charge = data.charge;
      if (item.operator !== undefined) {
        weightCharge.operator = item.operator;
      }
      if (item.weight !== undefined) {
        weightCharge.weight = item.weight;
      }
      if (item.charge !== undefined) {
        weightCharge.charge = item.charge;
      }
      await weightCharge.save();
      }
      return new DataResponseDto({}, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const weightCharge = await WeightCharge.findByPk(id);
      if (!weightCharge)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await weightCharge.destroy();
      return new DataResponseDto(weightCharge, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

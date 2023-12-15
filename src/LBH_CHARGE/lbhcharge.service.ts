import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { LbhCharge } from "./lbhcharge.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateLbhChargeDto } from "./dto/createLbhCharge.dto";
import { UpdateLbhChargeDto } from "./dto/updateLbhCharge.dto";
import { LbhChargeDto } from "./dto/lbhcharge.dto";

@Injectable()
export class LbhChargeService {
  constructor(
    @Inject("LbhChargeRepository")
    private readonly lbhChargeRepository: typeof LbhCharge
  ) {}

  async findAll() {
    try {
      const deliveryCharges = await this.lbhChargeRepository.findAll({});
      const data = deliveryCharges.map(
        (item: LbhCharge) => new LbhChargeDto(item)
      );
      return new DataResponseDto(data, true, "Successfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateLbhChargeDto[]) {
    try {
      for (const item of data) {
        const lbhCharge = new LbhCharge();
        if (!lbhCharge)
          throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
        if (item.operator !== undefined) {
          lbhCharge.operator = item.operator;
        }
        if (item.length !== undefined) {
          lbhCharge.length = item.length;
        }
        if (item.breadth !== undefined) {
          lbhCharge.breadth = item.breadth;
        }
        if (item.height !== undefined) {
          lbhCharge.height = item.height;
        }
        if (item.charge !== undefined) {
          lbhCharge.charge = item.charge;
        }
        await lbhCharge.save();
      }
      return new DataResponseDto({}, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(data: UpdateLbhChargeDto[]) {
    try {
      for (const item of data) {
        const lbhCharge = await LbhCharge.findByPk(item.id);
        if (!lbhCharge)
          throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
        if (item.operator !== undefined) {
          lbhCharge.operator = item.operator;
        }
        if (item.length !== undefined) {
          lbhCharge.length = item.length;
        }
        if (item.breadth !== undefined) {
          lbhCharge.breadth = item.breadth;
        }
        if (item.height !== undefined) {
          lbhCharge.height = item.height;
        }
        if (item.charge !== undefined) {
          lbhCharge.charge = item.charge;
        }
        await lbhCharge.save();
      }
      return new DataResponseDto({}, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const lbhCharge = await LbhCharge.findByPk(id);
      if (!lbhCharge)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await lbhCharge.destroy();
      return new DataResponseDto(lbhCharge, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

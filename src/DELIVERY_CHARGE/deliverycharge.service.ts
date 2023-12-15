import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { DeliveryCharge } from "./deliverycharge.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateDeliveryChargeDto } from "./dto/createDeliveryCharge.dto";
import { UpdateDeliveryChargeDto } from "./dto/updateDeliveryCharge.dto";
import { DeliveryChargeDto } from "./dto/deliverycharge.dto";

@Injectable()
export class DeliveryChargeService {
  constructor(
    @Inject("DeliveryChargeRepository")
    private readonly deliveryChargeRepository: typeof DeliveryCharge
  ) {}

  async findAll() {
    try {
      const deliveryCharges = await this.deliveryChargeRepository.findAll({});
      const data = deliveryCharges.map(
        (item: DeliveryCharge) => new DeliveryChargeDto(item)
      );
      return new DataResponseDto(data, true, "Successfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateDeliveryChargeDto[]) {
    try {
        for (const item of data) {
      const deliveryCharge = new DeliveryCharge();
      if (!deliveryCharge)
      throw new HttpException("No ID found", HttpStatus.NOT_FOUND);

    // Update the fields based on the provided values in the DTO
    if (item.comparisonOperator !== undefined) {
      deliveryCharge.comparisonOperator = item.comparisonOperator;
    }
    if (item.value !== undefined) {
      deliveryCharge.value = item.value;
    }
    if (item.charge !== undefined) {
      deliveryCharge.charge = item.charge;
    }
      await deliveryCharge.save();
        }
      return new DataResponseDto({}, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(data: UpdateDeliveryChargeDto[]) {
    try {
      for (const item of data) {
        const deliveryCharge = await DeliveryCharge.findByPk(item.id);
        if (!deliveryCharge)
          throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
  
        // Update the fields based on the provided values in the DTO
        if (item.comparisonOperator !== undefined) {
          deliveryCharge.comparisonOperator = item.comparisonOperator;
        }
        if (item.value !== undefined) {
          deliveryCharge.value = item.value;
        }
        if (item.charge !== undefined) {
          deliveryCharge.charge = item.charge;
        }
  
        await deliveryCharge.save();
      }
  
      return new DataResponseDto({}, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  
  
  

  async delete(id: number) {
    try {
      const deliveryCharge = await DeliveryCharge.findByPk(id);
      if (!deliveryCharge)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await deliveryCharge.destroy();
      return new DataResponseDto(deliveryCharge, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

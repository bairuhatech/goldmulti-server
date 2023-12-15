import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { BusinessType } from "./businesstype.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateBusinessTypeDto } from "./dto/createBusinessType.dto";
import { UpdateBusinessTypeDto } from "./dto/updateBusinessType.dto";
import { BusinessTypeDto } from "./dto/businesstype.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageMetaDto } from "../shared/dto/page-meta.dto";

@Injectable()
export class BusinessTypeService {
  constructor(
    @Inject("BusinessTypeRepository")
    private readonly BusinessTypeRepository: typeof BusinessType
  ) {}

  async findAll() {
    try {
      const businesstype = await this.BusinessTypeRepository.findAll({});
      const data = businesstype.map(
        (item: BusinessType) => new BusinessTypeDto(item)
      );
      return new DataResponseDto(data, true, "Successfully");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateBusinessTypeDto) {
    try {
      const businesstype = new BusinessType();
      businesstype.name = data.name;
      businesstype.description = data.description;
      const created = await businesstype.save();
      return new DataResponseDto(created, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: UpdateBusinessTypeDto) {
    try {
      const businesstype = await BusinessType.findByPk(id);
      if (!businesstype)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      businesstype.name = data.name;
      businesstype.description = data.description;
      const updated = await businesstype.save();
      return new DataResponseDto(businesstype, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const businesstype = await BusinessType.findByPk(id);
      if (!businesstype)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await businesstype.destroy();
      return new DataResponseDto(businesstype, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

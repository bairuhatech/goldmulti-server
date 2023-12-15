import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Address } from "./address.entity";
import { AddressDto } from "./dto/address.dto";
import { CreateAddressDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { DatabaseError } from "sequelize";
import { User } from "../USERS/user.entity";
@Injectable()
export class AddressService {
  constructor(
    @Inject("AddressRepository")
    private readonly AddressRepository: typeof Address
  ) {}

  async findById(id: number) {
    try {
      const data = await this.AddressRepository.findByPk<Address>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }

  async findAll(userId: number) {
    try {
      const allList = await this.AddressRepository.findAll<Address>({
        where: {
          userId: userId,
        },
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: User,
            required: true,
            attributes:['name']
          },
        ],
      });
      // const data = allList.map((item) => new AddressDto(item));
      return new DataResponseDto(allList, true, "success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async findOne(id: number): Promise<Address> {
    return this.AddressRepository.findByPk(id);
  }

  async create(create: CreateAddressDto) {
    try {
      const address = new Address();
      address.userId = create.userId;
      address.flat = create.flat;
      address.pin_code = create.pin_code;
      address.state = create.state;
      address.street = create.street;
      address.alt_phone = create.alt_phone;
      address.geo_location = create.geo_location;
      address.type = create.type;
      address.city = create.city;
      address.fullAddress=create.fullAddress;
      const createData = await address.save();
      return new DataResponseDto(createData, true, "Successfully added");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: CreateAddressDto) {
    try {
      const address = await this.findById(id);
      address.userId = data.userId;
      address.flat = data.flat;
      address.pin_code = data.pin_code;
      address.state = data.state;
      address.street = data.street;
      address.alt_phone = data.alt_phone;
      address.geo_location = data.geo_location;
      address.type = data.type;
      address.city = data.city;
      address.fullAddress=data.fullAddress;
      const updatedData = await address.save();
      return new DataResponseDto(updatedData, true, "Successfully updated");
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      await pkId.destroy();
      return new DataResponseDto(pkId, true, "successfully deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

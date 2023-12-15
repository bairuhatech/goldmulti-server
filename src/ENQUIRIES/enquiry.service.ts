import { Inject, Injectable } from "@nestjs/common";
import { Enquiry } from "./enquiry.entity";
import { EnquiryDto } from "./dto/enquiry.dto";
import { CreateEnquiryDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Injectable()
export class EnquiryService {
  constructor(
    @Inject("EnquiryRepository")
    private readonly EnquiryRepository: typeof Enquiry
  ) {}

  async findAll() {
    const Users = await this.EnquiryRepository.findAll<Enquiry>({});
    return Users;
  }

  async create(create: CreateEnquiryDto) {
    console.log(create, "createData");
    try {
      const enquiry = new Enquiry();
      enquiry.email = create.email;
      enquiry.message = create.message;
      console.log(enquiry, "====================>>> enquiry");
      const createData = await enquiry.save();

      return new DataResponseDto(createData, true, "Successfully added");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  //   async update(id: number, data: CreateAddressDto) {
  //     try {
  //       const banner = await this.findById(id);
  //       banner.userId = data.userId;
  //       banner.flat = data.flat;
  //       banner.pin_code = data.pin_code;
  //       banner.state = data.state;
  //       banner.street = data.street;
  //       banner.alt_phone = data.alt_phone;
  //       banner.geo_location = data.geo_location;
  //       banner.type = data.type;
  //       banner.city = data.city;
  //       const updatedData = await banner.save();
  //       return new DataResponseDto(updatedData, true, "Successfully updated");
  //     } catch (error) {
  //       return new DataResponseDto({}, false, error.message);
  //     }
  //   }

  //   async delete(id: number) {
  //     try {
  //       const pkId = await this.findById(id);
  //       await pkId.destroy();
  //       return new DataResponseDto(pkId, true, "successfully deleted");
  //     } catch (err) {
  //       return new DataResponseDto({}, false, err.message);
  //     }
  //   }
}

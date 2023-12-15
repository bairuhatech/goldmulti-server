import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IndividualSeller } from "./individualseller.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateIndividualSellerDto } from "./dto/createIndividualSeller.dto";
import { UpdateIndividualSellerDto } from "./dto/updateIndividualSeller.dto";
import { IndividualSellerDto } from "./dto/individualseller.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { UpdateStoreStatusDto } from "./dto/updateStatus.dto";
import { MailService } from "../MAILS/Mails.services";
import { RequestDocumentMailDto } from "../STORE/dto/requestDocumentMail.dto";
import { ToAdminIndividual } from "../MAILS/templates/sellers/toAdmin_individual";
import { ToUserIndividual } from "../MAILS/templates/sellers/toUser_individual";
import { SettingsService } from "../SETTINGS/settings.service";
import { ToUserApproval } from "../MAILS/templates/sellers/toUser_Approval";
import { ToUserRejection } from "../MAILS/templates/sellers/toUser_Rejection";
import { ToIndividualRequestDocument } from "../MAILS/templates/sellers/toIndivRequestDocument";

@Injectable()
export class IndividualSellerService {
  constructor(
    @Inject("IndividualSellerRepository")
    private readonly IndividualSellerRepository: typeof IndividualSeller,
    private readonly mailService:MailService,
    private settingsService: SettingsService
  ) {}
  async findWithPagination(pageOptionsDto: PageOptionsDto) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    try {
      const allList = await this.IndividualSellerRepository.findAndCountAll({
        order: [["createdAt", pageOptionsDto.order]],
        limit: pageOptionsDto.take,
        offset: skip,
      });
      const data = allList.rows.map(
        (item: IndividualSeller) => new IndividualSellerDto(item)
      );
      const itemCount = allList.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(data, true, "Success", meta);
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async findOne(id: number) {
    try {
      const individualseller = await this.IndividualSellerRepository.findByPk(
        id
      );
      if (!individualseller)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      return new DataResponseDto(
        individualseller,
        true,
        "Successfully fetched"
      );
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async create(data: CreateIndividualSellerDto) {
    try {
      const individualseller = new IndividualSeller();
      individualseller.name = data.name;
      individualseller.email = data.email;
      individualseller.business_location = data.business_location;
      individualseller.education = data.education;
      individualseller.visa_status = data.visa_status;
      individualseller.age = data.age;
      individualseller.gender = data.gender;
      individualseller.language = data.language;
      individualseller.interest = data.interest;
      individualseller.phone = data.phone;
      individualseller.code = data.code;
      individualseller.status = "pending";
      individualseller.status_remark = "";
      const created = await individualseller.save();
      let adminEmail =  await this.settingsService.getAdminEmail();
      let adminMail = await ToAdminIndividual(created, adminEmail);
      let userMail = await ToUserIndividual(created);
      this.mailService.sellerEmails(adminMail);
      this.mailService.sellerEmails(userMail);
      return new DataResponseDto(created, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  // async update(id: number, data: UpdateIndividualSellerDto) {
  //   try {
  //     const individualseller = await IndividualSeller.findByPk(id);
  //     if (!individualseller)
  //       throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
  //     individualseller.name = data.name;
  //     individualseller.email = data.email;
  //     individualseller.business_location = data.business_location;
  //     individualseller.business_type = data.business_type;
  //     individualseller.visa_status = data.visa_status;
  //     individualseller.age = data.age;
  //     individualseller.gender = data.gender;
  //     individualseller.language = data.language;
  //     individualseller.interest = data.interest;
  //     individualseller.phone = data.phone;
  //     const updated = await individualseller.save();
  //     return new DataResponseDto(updated, true, "Successfully Updated");
  //   } catch (err) {
  //     return new DataResponseDto({}, false, err.message);
  //   }
  // }

  async updateStatus(id: number, data: UpdateStoreStatusDto) {
    try {
      const individualseller = await IndividualSeller.findByPk(id);
      if (!individualseller)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      individualseller.status = data.status;
      individualseller.status_remark = data.status_remark;
      const updated = await individualseller.save();
      let approvalMail = await ToUserApproval(updated);
      let rejectionMail = await ToUserRejection(updated);
      if (data.status === 'approved') {
        this.mailService.sellerEmails(approvalMail);
      } else if (data.status === 'rejected') {
        this.mailService.sellerEmails(rejectionMail);
      }
      return new DataResponseDto(updated, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async delete(id: number) {
    try {
      const individualseller = await IndividualSeller.findByPk(id);
      if (!individualseller)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await individualseller.destroy();
      return new DataResponseDto(
        individualseller,
        true,
        "Successfully Deleted"
      );
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async reqestDocumentMail(data: RequestDocumentMailDto) {
    try {
      let documentmail = await ToIndividualRequestDocument(data);
      const mail = await this.mailService.RequestDocumentMail(documentmail);
      return new DataResponseDto({}, true, "Email send successfully");
    } catch (err) {
      return new DataResponseDto({}, false, "Failed to send email");
    }
  }
}

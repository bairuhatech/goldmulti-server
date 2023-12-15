import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Store } from "./store.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateStoreDto } from "./dto/createStore.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { StoreDto } from "./dto/store.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { UpdateStoreStatusDto } from "./dto/updateStatus.dto";
import { MailService } from "../MAILS/Mails.services";
import { RequestDocumentMailDto } from "./dto/requestDocumentMail.dto";
import { UserService } from "../USERS/user.services";
import { UpdateStoreDto } from "./dto/updateStore.dto";

import { SettingsService } from "../SETTINGS/settings.service";
import { ToAdminCorporate } from "../MAILS/templates/sellers/toAdmin_coorporate";
import { ToUserCorporate } from "../MAILS/templates/sellers/toUser_coorporate";
import { ToUserApproval } from "../MAILS/templates/sellers/toUser_Approval";
import { ToUserRejection } from "../MAILS/templates/sellers/toUser_Rejection";
import { getErrorMessage } from "../shared/helpers/errormessage";
import { Op } from "sequelize";

@Injectable()
export class StoreService {
  constructor(
    @Inject("StoreRepository")
    private readonly StoreRepository: typeof Store,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private settingsService: SettingsService
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, type: string) {
    let where = {};
    if (type == "approved") {
      where["status"] = { [Op.notIn]: ["approved"] };
    }
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    try {
      const allList = await this.StoreRepository.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit: pageOptionsDto.take,
        offset: skip,
        where: where,
      });
      const data = allList.rows.map((item: Store) => new StoreDto(item));
      const itemCount = allList.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        data,
        true,
        "Successfully Fetched",
        meta
      );
    } catch (err) {
      return new DataResponseDtoPagination([], false, err.message, {});
    }
  }

  async findOne(id: number) {
    try {
      const store = await this.StoreRepository.findByPk(id);
      if (!store) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      const storeData = new StoreDto(store);
      return new DataResponseDto(storeData, true, "Successfully fetched");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async create(data: CreateStoreDto) {
    try {
      const store = new Store();
      store.name = data.name;
      store.email = data.email;
      store.password = data.password;
      store.business_location = String(data.business_location);
      store.business_type = data.business_type;
      store.agreement = data.agreement;
      store.trn_number = data.trn_number;
      store.trade_lisc_no = data.trade_lisc_no;
      store.seller_name = data.seller_name;
      store.seller_country = data.seller_country;
      store.birth_country = data.birth_country;
      store.dob = data.dob;
      store.id_proof = data.id_proof;
      store.id_issue_country = data.id_issue_country;
      store.id_expiry_date = data.id_expiry_date;
      store.store_name = data.store_name;
      store.upscs = data.upscs;
      store.manufacture = data.manufacture;
      store.trn_upload = data.trn_upload;
      store.logo_upload = data.logo_upload;
      store.phone = data.phone;
      store.business_address = data.business_address;
      store.first_name = data.first_name;
      store.last_name = data.last_name;
      store.id_type = data.id_type;
      store.code = data.code;
      store.status = data.status;
      store.status_remark = data.status_remark;
      const created = await store.save();
      //create account for seller in user table
      if (data.userId) {
        await this.userService.updateUserToSeller(created?.id, data);
      } else {
        await this.userService.createSeller(created?.id, data);
      }
      let adminEmail = await this.settingsService.getAdminEmail();
      let adminMail = await ToAdminCorporate(created, adminEmail);
      let userMail = await ToUserCorporate(created);
      this.mailService.sellerEmails(adminMail);
      this.mailService.sellerEmails(userMail);
      return new DataResponseDto(created, true, "Successfully Created");
    } catch (err) {
      console.log(err);
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(data: UpdateStoreDto, id: number) {
    try {
      const store = await this.StoreRepository.findByPk<Store>(id, {});
      if (!store) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      store.name = data.name;
      store.email = data.email;
      store.password = data.password;
      store.business_location = String(data.business_location);
      store.business_type = data.business_type;
      store.agreement = data.agreement;
      store.trn_number = data.trn_number;
      store.trade_lisc_no = data.trade_lisc_no;
      store.seller_name = data.seller_name;
      store.seller_country = data.seller_country;
      store.birth_country = data.birth_country;
      store.dob = data.dob;
      store.id_proof = data.id_proof;
      store.id_issue_country = data.id_issue_country;
      store.id_expiry_date = data.id_expiry_date;
      store.store_name = data.store_name;
      store.upscs = data.upscs;
      store.manufacture = data.manufacture;
      store.trn_upload = data.trn_upload;
      store.logo_upload = data.logo_upload;
      store.phone = data.phone;
      store.business_address = data.business_address;
      store.first_name = data.first_name;
      store.last_name = data.last_name;
      store.id_type = data.id_type;
      store.code = data.code;
      store.status = data.status;
      store.status_remark = data.status_remark;
      const updated = await store.save();
      return new DataResponseDto(updated, true, "Successfully updated");
    } catch (err) {
      return new DataResponseDto({}, false, getErrorMessage(err));
    }
  }

  async updateStatus(id: number, data: UpdateStoreStatusDto) {
    try {
      const store = await Store.findByPk(id);
      if (!store) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      store.status = data.status;
      store.status_remark = data.status_remark;
      const updated = await store.save();
      let approvalMail = await ToUserApproval(updated);
      let rejectionMail = await ToUserRejection(updated);
      if (data.status === "approved") {
        this.mailService.sellerEmails(approvalMail);
      } else if (data.status === "rejected") {
        this.mailService.sellerEmails(rejectionMail);
      }
      return new DataResponseDto(updated, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, getErrorMessage(err));
    }
  }

  async delete(id: number) {
    try {
      const store = await Store.findByPk(id);
      if (!store) throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      await store.destroy();
      return new DataResponseDto(store, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async reqestDocumentMail(data: RequestDocumentMailDto) {
    try {
      const mail = await this.mailService.RequestDocumentMail(data);
      return new DataResponseDto({}, true, "Email send successfully");
    } catch (err) {
      return new DataResponseDto({}, false, "Failed to send email");
    }
  }
}

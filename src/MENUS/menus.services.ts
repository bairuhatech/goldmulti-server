import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Menus } from "./menus.entity";
import { MenusDto } from "./dto/menus.dto";
import { PageDto } from "../shared/dto/page.dto";
import { CreateMenusDto } from "./dto/create.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { RolesConfig } from "../ROLES_CONFIG/rolesConfig.entity";
import { MailService } from "../MAILS/Mails.services";
import { Op } from "sequelize";
@Injectable()
export class MenusService {
  constructor(
    @Inject("MenusRepository")
    private menusRepository: typeof Menus,
    private emailService: MailService
  ) {}

  async findById(id: number) {
    try {
      const data = await this.menusRepository.findByPk<Menus>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      return;
    }
  }

  async findAll() {
    try {
      const allList = await this.menusRepository.findAll<Menus>();
      return { data: allList, status: true, message: "Success" };
    } catch (err) {
      return { data: [], status: false, message: "Fail" };
    }
  }
  async findAllMenusByIds(ids: any) {
    try {
      let menus = null;
      // Validate input
      if (typeof ids !== "string") {
        throw new Error("Input should be a string");
      }

      // Split the string into an array of IDs
      const idArray = ids.split("|").map((id) => Number(id)); // Assuming IDs are numeric

      if (idArray.length) {
        menus = await this.menusRepository.findAll<Menus>({
          where: {
            id: { [Op.in]: idArray },
          },
        });
      } else {
        menus = [];
      }

      return { data: menus, status: true, message: "Success" };
    } catch (err) {
      // Improved error handling with specific error messages
      return { data: [], status: false, message: err.message || "Fail" };
    }
  }

  async listAll(pageOptionsDto: PageOptionsDto) {
    try {
      const skip =
        (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take) || 0;
      const limit = Number(pageOptionsDto.take) || 10;

      const allList = await this.menusRepository.findAndCountAll({
        limit: limit,
        offset: skip,
      });
      console.log("==>", allList);
      const data = allList?.rows?.map((item) => new MenusDto(item));
      const itemCount = allList?.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(data, true, "Success", pageMetaDto);
    } catch (err) {
      return new PageDto([], false, err.message, null);
    }
  }

  async create(create: CreateMenusDto) {
    try {
      const menus = new Menus();
      menus.name = create.name;
      menus.route = create.route;
      menus.icon = create.icon;
      const createData = await menus.save();
      return new DataResponseDto(
        createData,
        true,
        "Successfully Created New item"
      );
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async inviteUser(data: any) {
    const email: any = data.email;
    let mailObj: any = {
      to: email,
      subject: "You've an invite to store in NextME",
    };
    console.log("mail = = = = == = = >", mailObj);
    await this.emailService.InviteUserMail(mailObj);
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      await pkId.destroy();
      return new DataResponseDto(pkId, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

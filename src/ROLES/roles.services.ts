import { Inject, Injectable } from "@nestjs/common";
import { Roles } from "./roles.entity";
import { PageDto } from "../shared/dto/page.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Op } from "sequelize";
@Injectable()
export class RolesService {
  constructor(
    @Inject("RolesRepository")
    private readonly RolesRepository: typeof Roles
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto, role: any) {
    try {
      let whereCase = {};
      if (role.name) {
        whereCase["name"] = {
          [Op.like]: `%${role.name}%`,
        };
      }
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const allList = await Roles.findAll({
        where: whereCase,
      });
      const itemCount = 0;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(allList, true, "Success", pageMetaDto);
    } catch (err) {
      console.log("err = = = >", err);
      return new PageDto([], false, err.message, null);
    }
  }

  // async create(data: CreateRolesDto) {
  //   try {
  //     const roles = new Roles();
  //     roles.store_id = data.store_id;
  //     roles.name = data.name;
  //     roles.isEditable = true;
  //     const create = await roles.save();
  //     let message = "New Role created Successfully";
  //     return new DataResponseDto(create, true, message);
  //   } catch (error) {
  //     return new DataResponseDto({}, false, error.message);
  //   }
  // }
  async findOrCreate(data: any) {
    try {
      const [role, created] = await Roles.findOrCreate({
        where: {
          store_id: data.store_id,
          name: data.name,
        },
        defaults: {
          isEditable: true,
        },
      });

      if (created) {
        let message = "New Role created Successfully";
        return new DataResponseDto(role, true, message);
      } else {
        let message = "Role already exists";
        return new DataResponseDto(role, true, message);
      }
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async delete(id: number) {
    try {
      const pkId = await Roles.findOne({ where: { id: id } });
      await pkId.destroy();
      return new DataResponseDto(pkId, true, " Role Deleted Successfully");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
}

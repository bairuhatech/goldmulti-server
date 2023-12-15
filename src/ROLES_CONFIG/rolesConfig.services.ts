import { Inject, Injectable } from "@nestjs/common";
import { RolesConfig } from "./rolesConfig.entity";
import { PageDto } from "../shared/dto/page.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { MenusService } from "../MENUS/menus.services";
@Injectable()
export class RolesConfigService {
  constructor(
    @Inject("RolesRepository")
    private readonly RolesRepository: typeof RolesConfig,
    private menusService: MenusService
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const allList = await this.RolesRepository.findAndCountAll<RolesConfig>({
        limit: pageOptionsDto.take,
        offset: skip,
        order: [["updatedAt", pageOptionsDto.order]],
      });
      // const data = allList?.rows?.map((item) => new RolesConfigDto(item));
      const itemCount = allList?.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(allList.rows, true, "Success", pageMetaDto);
    } catch (err) {
      return new PageDto([], false, err.message, null);
    }
  }
  async findMenusForRole(roleId: any) {
    try {
      const roleidMenus = await this.RolesRepository.findOne({
        where: { role_id: Number(roleId) },
      });
      const menus = await this.menusService.findAllMenusByIds(
        roleidMenus.menus
      );
      return menus;
    } catch (err) {
      return new PageDto([], false, err.message, null);
    }
  }

  async findUser(id: number) {
    return await this.RolesRepository.findOne({
      where: { id: id },
    });
  }
  async create(data: any) {
    try {
      // Check if the role_id already exists in the database
      const existingRole = await RolesConfig.findOne({
        where: { role_id: data.role_id },
      });

      if (existingRole) {
        existingRole.store_id = data.store_id;
        existingRole.menus = data?.menu?.join("|");
        await existingRole.save();

        let message = "Role Config updated Successfully";
        return new DataResponseDto(existingRole, true, message);
      } else {
        const newRoleConfig = await RolesConfig.create({
          role_id: data.role_id,
          store_id: data.store_id,
          menus: data?.menu?.join("|"),
        });

        let message = "New Role Config created Successfully";
        return new DataResponseDto(newRoleConfig, true, message);
      }
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async updateOrCreate(data: any) {
    try {
      const existingRecord = await this.findUser(data?.user_id);
      const rolesConfig = {
        role_id: data?.role_id,
        menus: data?.menu?.join("|") || "",
      };
      if (existingRecord) {
        Object.assign(existingRecord, rolesConfig);
        await existingRecord.save();
        return existingRecord;
      } else {
        const createData = await RolesConfig.create(rolesConfig);
        return createData;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

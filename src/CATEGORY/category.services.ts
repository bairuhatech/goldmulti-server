import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryDto } from "./dto/category.dto";
import { CreateCategoryDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { PageDto } from "../shared/dto/page.dto";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { Products } from "../PRODUCTS/products.entity";
import { Op, Sequelize } from "sequelize";
import sequelize from "sequelize";
import { getErrorMessage } from "../shared/helpers/errormessage";
@Injectable()
export class CategoryService {
  constructor(
    @Inject("CategoryRepository")
    private readonly CategoryRepository: typeof Category
  ) {}

  async findById(id: number) {
    try {
      const data = await this.CategoryRepository.findByPk<Category>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;

      const allList = await this.CategoryRepository.findAndCountAll<Category>({
        limit: pageOptionsDto.take,
        offset: skip,
        order: [["updatedAt", pageOptionsDto.order]],
      });
      const data = allList?.rows?.map((item) => new CategoryDto(item));
      const itemCount = allList.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(data, true, "Success", pageMetaDto);
    } catch (err) {
      return new PageDto([], false, getErrorMessage(err), null);
    }
  }

  async create(create: CreateCategoryDto) {
    try {
      const cat = new Category();
      cat.name = create.name;
      cat.image = create.image;
      cat.description = create.description;
      const createData = await cat.save();
      return new DataResponseDto(
        createData,
        true,
        "Successfully Created New item"
      );
    } catch (err) {
      return new DataResponseDto({}, false, getErrorMessage(err));
    }
  }

  async update(id: number, data: CreateCategoryDto) {
    try {
      const cat = await this.findById(id);
      if (!cat) throw new HttpException("No id found", HttpStatus.NOT_FOUND);
      cat.name = data.name;
      cat.image = data.image;
      cat.description = data.description;
      const updatedData = await cat.save();
      return new DataResponseDto(updatedData, true, "Successfully Updated");
    } catch (error) {
      return new DataResponseDto({}, false, getErrorMessage(error));
    }
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      await pkId.destroy();
      return new DataResponseDto(pkId, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, getErrorMessage(err));
    }
  }
  async findAllCategory() {
    try {
      const categories = await this.CategoryRepository.findAll({
        include: [
          {
            model: SubCategory,
            required: false,
          },
        ],
        order: [["createdAt", "ASC"]],
      });
      return new DataResponseDto(categories, true, "success");
    } catch (err) {
      return new DataResponseDto([], false, getErrorMessage(err));
    }
  }
  async getCategoryNames(name: string): Promise<string[]> {
    try {
      const data = await this.CategoryRepository.findAll({
        where: {
          name: { [Op.startsWith]: name },
        },
        attributes: ["name"],
        group: ["name"],
      });
      const response = data?.map((item: any) => item.name);
      return response;
    } catch (err) {
      return [];
    }
  }
  async getCategoryID(name: string): Promise<number> {
    try {
      const category = await this.CategoryRepository.findOne({
        where: {
          name: { [Op.iLike]: `%${name.trim()}%` },
        },
      });
      const categoryId: number = category?.id ? category.id : 0;
      return categoryId;
    } catch (err) {
      return 0;
    }
  }
}

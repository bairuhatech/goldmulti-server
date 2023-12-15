import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { SubCategory } from "./sub_category.entity";
import { SubCategoryDto } from "./dto/sub_category.dto";
import { CreateSubCategoryDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Op, Sequelize } from "sequelize";
import { Products } from "../PRODUCTS/products.entity";
import { ProductSearchPageOptionsDto } from "../PRODUCT_SEARCH/dto/product_search_bysubcategory_dto";
import { ProductsService } from "../PRODUCTS/products.services";
import sequelize from "sequelize";
import { Category } from "../CATEGORY/category.entity";

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject("SubCategoryRepository")
    private readonly SubCategoryRepository: typeof SubCategory,
    private readonly productsService: ProductsService
  ) {}

  async findById(id: number) {
    try {
      const data = await this.SubCategoryRepository.findByPk<SubCategory>(
        id,
        {}
      );
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }

  async findAll() {
    try {
      const allList = await this.SubCategoryRepository.findAll<SubCategory>({
        include: [
          {
            model: Category,
            required: true,
            attributes: ["name"],
          },
        ],
        order:[['updatedAt','DESC']]
      });
      const data = allList;
      return new DataResponseDto(data, true, "Success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(create: CreateSubCategoryDto) {
    try {
      const subCategory = new SubCategory();
      subCategory.name = create.name;
      subCategory.image = create.image;
      subCategory.category_id = create.category_id;
      subCategory.description = create.description;
      const createData = await subCategory.save();
      return new DataResponseDto(createData, true, "Successfully Created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: CreateSubCategoryDto) {
    try {
      const subCategory = await this.findById(id);
      if (!subCategory)
        return new DataResponseDto({}, false, "Unable to find the Item");
      subCategory.name = data.name;
      subCategory.image = data.image;
      subCategory.category_id = data.category_id;
      subCategory.description = data.description;
      const updatedData = await subCategory.save();
      return new DataResponseDto(
        updatedData,
        true,
        "Product Updated Successfully"
      );
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      if (!pkId) throw new HttpException("No id found", HttpStatus.NOT_FOUND);
      await pkId.destroy();
      return new DataResponseDto(pkId, true, "Successfully Deleted");
    } catch (err) {
      return new DataResponseDto({}, false, "Failed to Delete");
    }
  }
  async getSubCategoryNames(name: string): Promise<string[]> {
    try {
      const data = await this.SubCategoryRepository.findAll({
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
  async getSubCategoryID(name: string): Promise<number> {
    try {
      const subcategory = await this.SubCategoryRepository.findOne({
        where: {
          name:{[Op.iLike]:`%${name.trim()}%`}
        }
      });
      const subcategoryId = subcategory?._id ? subcategory._id : 0;
      return subcategoryId;
    } catch (err) {
      return 0;
    }
  }
}

import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Products } from "../PRODUCTS/products.entity";
import { Op, Sequelize } from "sequelize";
import { CategoryService } from "../CATEGORY/category.services";
import { Injectable } from "@nestjs/common";
import { SubCategoryService } from "../SUB_CATEGORY/sub_category.services";
import { ProductSearchPageOptionsDto } from "./dto/product_search_bysubcategory_dto";
import { ProductsService } from "../PRODUCTS/products.services";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { ProductSearchByNameDto } from "./dto/product_search_byname_dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { Store } from "../STORE/store.entity";
import { getMetaInfo } from "../shared/helpers/getmeta";
import { StoreService } from "../STORE/store.service";
const excludeProductAttributes = [
  "sku",
  "bar_code",
  "brand",
  "bulk_order",
  "specifications",
  "manufacture",
  "unit",
  "createdAt",
  "updatedAt",
];
const storeAttributes = [
  "store_name",
  "business_type",
  "id",
  "logo_upload",
  "createdAt",
];
const successMsg = "Products Successfully Fetched";
@Injectable()
export class ProductSearchServices {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductsService,
    private readonly storeService: StoreService
  ) {}
  async getProductsSingleSeller(pageOptionsDto: ProductSearchByNameDto) {
    const { name, price, page, take, order } = pageOptionsDto;
    const skip = (page - 1) * take;
    try {
      const categoryId = await this.categoryService.getCategoryID(name);
      const subcategoryId = await this.subCategoryService.getSubCategoryID(
        name
      );
      const products = await Products.findAndCountAll({
        where: {
          [Op.and]: [
            {
              status: true,
            },
            {
              [Op.or]: [
                {
                  name: { [Op.iLike]: `%${name.trim()}%` },
                },
                { category: categoryId },
                { subCategory: subcategoryId },
              ],
            },
          ],
        },
        limit: take,
        order:
          order == "DESC"
            ? [["updatedAt", order]]
            : order == "ASC" && price == "RAND"
            ? []
            : [["price", price]],
        offset: skip,
        attributes: {
          exclude: excludeProductAttributes,
        },
      });
      const itemCount: number = products?.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        products.rows,
        true,
        "Success",
        pageMetaDto
      );
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async getProductsMultiSeller(pageOptionsDto: ProductSearchByNameDto) {
    const { name, price, page, take, order } = pageOptionsDto;
    const skip = (page - 1) * take;
    try {
      const categoryId = await this.categoryService.getCategoryID(name);
      const subcategoryId = await this.subCategoryService.getSubCategoryID(
        name
      );
      const products = await Store.findAndCountAll({
        order: [["createdAt", order]],
        where: {
          [Op.and]: [
            { status: "approved" },
            { "$productList.status$": true },
            {
              [Op.or]: [
                { "$productList.name$": { [Op.iLike]: `%${name.trim()}%` } },
                { "$productList.category$": categoryId },
                { "$productList.subCategory$": subcategoryId },
              ],
            },
          ],
        },
        attributes: storeAttributes,
        limit: 50, //doesn't work properly
        offset: skip,
        distinct: true,
        group: ["Store.id", "productList._id"],
        include: [
          {
            model: Products,
            // separate: true,
            duplicating: false,
            required: true,
            as: "productList",
            // limit:take,
            order: [["createdAt", order]],
            attributes: {
              exclude: excludeProductAttributes,
            },
          },
        ],
        // logging: console.log,
      });
      const resultArray = getMetaInfo(products.count);
      const itemCount = resultArray.length;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        products.rows,
        true,
        successMsg,
        pageMetaDto
      );
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async getProductNames(name: string): Promise<string[]> {
    try {
      const data = await Products.findAll({
        where: {
          name: { [Op.substring]: name },
        },
        attributes: ["name"],
        group: ["name"],
        limit: 10,
      });
      const response = data?.map((item: any) => item.name);
      return response;
    } catch (err) {
      return [];
    }
  }
  async getProductsBySubCategory(queryParams: ProductSearchPageOptionsDto) {
    try {
      const { data, meta } = await this.productService.getProductsBySubCategory(
        queryParams
      );
      return new DataResponseDtoPagination(data, true, successMsg, meta);
    } catch (err) {
      return new DataResponseDtoPagination({}, false, err.message, {});
    }
  }

  async getProductsByName(pageOptionsDto: ProductSearchByNameDto) {
    try {
      const { type, name } = pageOptionsDto;
      if (
        (type !== "multi" && type !== "single") ||
        typeof name !== "string" ||
        name.length === 0
      )
        throw new Error("Invalid Input Please try again.");
      //if the search type is single ====single seller only returns list of products
      if (type === "single") {
        return await this.getProductsSingleSeller(pageOptionsDto);
      }
      //if the search type is multi ====multi seller returns list of shops matching the search
      if (type === "multi") {
        return await this.getProductsMultiSeller(pageOptionsDto);
      }
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async getRecommendations(name: string) {
    try {
      // const cateNames = await this.categoryService.getCategoryNames(name);
      // const subcNames = await this.subCategoryService.getSubCategoryNames(name);
      const prodNames = await this.getProductNames(name);
      // const combined = [...cateNames, ...subcNames, ...prodNames];
      const uniq = [...new Set(prodNames)];
      return new DataResponseDto(uniq, true, successMsg);
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
}

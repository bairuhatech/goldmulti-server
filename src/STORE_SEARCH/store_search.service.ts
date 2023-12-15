import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Products } from "../PRODUCTS/products.entity";
import { Op, Sequelize } from "sequelize";
import { CategoryService } from "../CATEGORY/category.services";
import { Injectable } from "@nestjs/common";
import { SubCategoryService } from "../SUB_CATEGORY/sub_category.services";
import { ProductsService } from "../PRODUCTS/products.services";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { StoreService } from "../STORE/store.service";
import { ProductSearchByStoreAndName } from "./dto/prouct_search_by_store.dto";
import { Store } from "../STORE/store.entity";
import { ProductsBySubCategoryDto } from "./dto/product_search_by_subcategory.dto";
import { ProductsBySubCategoryOnStoreDto } from "./dto/products_by_subcategory.dto";
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
export class StoreSearchServices {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductsService,
    private readonly storeService: StoreService
  ) {}
  async getProductsBySearch(pageOptionsDto: ProductSearchByStoreAndName) {
    const { name, storeId, order, page, take } = pageOptionsDto;
    const skip = (page - 1) * take;
    try {
      const categoryId = await this.categoryService.getCategoryID(name);
      const subcategoryId = await this.subCategoryService.getSubCategoryID(
        name
      );
      const products = await Products.findAndCountAll({
        where: {
          store_id: storeId,
          [Op.or]: [
            { name: { [Op.iLike]: `%${name.trim()}%` } },
            { category: categoryId },
            { subCategory: subcategoryId },
          ],
        },
        attributes: {
          exclude: excludeProductAttributes,
        },
        order: [["createdAt", order]],
        limit: take,
        offset: skip,
      });
      const itemCount = products.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        products.rows,
        true,
        successMsg,
        meta
      );
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async getStoreDetails(id: number) {
    try {
      const store = await Store.findByPk(id, {
        attributes: ["id", "name", "store_name", "logo_upload"],
      });
      if (!store) throw new Error("no store  found");
      const category = await this.getSubCategoriesByStoreId(id);
      return new DataResponseDto({ store, category }, true, successMsg);
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async getSubCategoriesByStoreId(storeId: number): Promise<SubCategory[]> {
    try {
      const subCategories = await SubCategory.findAll({
        attributes: ["_id", "name", "image", "description"],
        where: {
          _id: {
            [Op.in]: [
              SubCategory.sequelize.literal(
                `SELECT DISTINCT("subCategory") FROM public."PRODUCTS" WHERE "store_id" = ${storeId}`
              ),
            ],
          },
        },
      });
      return subCategories;
    } catch (err) {
      return [];
    }
  }
  async getAllProductsForStore(store: number) {
    try {
      const products = await SubCategory.findAndCountAll({
        order: [["createdAt", "DESC"]],
        attributes: ["_id", "name", "description", "image"],
        include: [
          {
            model: Products,
            duplicating: false,
            required: true,
            where: {
              store_id: store,
            },
            attributes: {
              exclude: excludeProductAttributes,
            },
          },
        ],
      });
      return new DataResponseDto(products.rows, true, successMsg);
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async getProductsForStoreByCategory(
    pageOptionsDto: ProductsBySubCategoryOnStoreDto
  ) {
    try {
      const { storeId, categoryId, order, price, take, page } = pageOptionsDto;
      const skip = (page - 1) * take;
      const products = await Products.findAndCountAll({
        where: {
          store_id: storeId,
          subCategory: categoryId,
        },
        attributes: {
          exclude: excludeProductAttributes,
        },
        order: [["createdAt", order]],
        limit: take,
        offset: skip,
      });
      const itemCount = products.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        products.rows,
        true,
        successMsg,
        meta
      );
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async getAllProductsBySubcategory(pageOptionsDto: ProductsBySubCategoryDto) {
    try {
      const { category, order, page, take } = pageOptionsDto;
      const skip = (page - 1) * take;
      const products = await Store.findAndCountAll({
        attributes: storeAttributes,
        order: [["createdAt", order]],
        offset: skip,
        // group: ["Store.id","productList._id"],
        // having: Sequelize.literal('COUNT(Products._id) > 0'),
        include: [
          {
            model: Products,
            required: true,
            // separate: true,
            attributes: {
              exclude: excludeProductAttributes,
            },
            where: {
              subCategory: category,
            },
          },
        ],
        // logging: console.log,
      });
      const itemCount = products.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      return new DataResponseDtoPagination(
        products.rows,
        true,
        successMsg,
        meta
      );
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
}

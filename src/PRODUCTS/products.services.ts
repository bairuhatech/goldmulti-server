import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Products } from "./products.entity";
import { CreateProductsDto } from "./dto/create.dto";
import { ProductsDto } from "./dto/products.dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { PageDto } from "../shared/dto/page.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { Category } from "../CATEGORY/category.entity";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { ProductSearchPageOptionsDto } from "../PRODUCT_SEARCH/dto/product_search_bysubcategory_dto";
import { ProductsPayloadDto } from "./dto/productsPayload.dto";
import { ProductImageService } from "../PRODUCT_IMAGE/productimage.service";
import { ProductVariantService } from "../PRODUCT_VARIANTS/productvariant.service";
import { ProductImage } from "../PRODUCT_IMAGE/productimage.entity";
import { ProductsByStoreDto } from "./dto/productsByStore.dto";
import { Op, Transaction } from "sequelize";
import { UpdateProductsDto } from "./dto/updateProduct.dto";
import { UpdateProductImagePayloadDto } from "./dto/updateProductImage.dto";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";
import { UpdateProductStatusDto } from "./dto/updateProductStatus.dto";
import { Store } from "../STORE/store.entity";
const pVariantAttributes = [
  "image",
  "available",
  "barcode",
  "combination",
  "price",
  "sku",
  "id",
  "units",
];
const pImageAttributes = ["url", "type", "id", "Key"];
@Injectable()
export class ProductsService {
  constructor(
    @Inject("ProductsRepository")
    private readonly ProductsRepository: typeof Products,
    private readonly productsImageService: ProductImageService,
    private readonly productVariantsService: ProductVariantService
  ) {}

  async findById(id: number) {
    try {
      const data = await this.ProductsRepository.findByPk<Products>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      return;
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const allList = await this.ProductsRepository.findAndCountAll<Products>({
        where: {
          status: true,
        },
        limit: pageOptionsDto.take,
        offset: skip,
        order: [["updatedAt", pageOptionsDto.order]],
        include: [
          {
            model: Category,
            required: true,
            attributes: ["name"],
          },
          {
            model: SubCategory,
            required: true,
            attributes: ["name"],
          },
        ],
      });
      const data = allList.rows.map((item) => new ProductsDto(item));
      const itemCount = allList.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(allList.rows, true, "Success", pageMetaDto);
    } catch (err) {
      return new PageDto([], false, err.message, null);
    }
  }

  async findByStore(pageOptionsDto: ProductsByStoreDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const allList = await this.ProductsRepository.findAndCountAll<Products>({
        where: {
          store_id: pageOptionsDto.storeId,
          // status:true
        },
        limit: pageOptionsDto.take,
        offset: skip,
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: Category,
            required: true,
            attributes: ["name"],
          },
          {
            model: SubCategory,
            required: true,
            attributes: ["name"],
          },
        ],
      });
      const data = allList.rows.map((item) => new ProductsDto(item));
      const itemCount = allList.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return new PageDto(allList.rows, true, "Success", pageMetaDto);
    } catch (err) {
      return new PageDto([], false, err.message, null);
    }
  }

  async create({ images, information, variants }: ProductsPayloadDto) {
    try {
      const response = await this.ProductsRepository.sequelize.transaction(
        async (transaction: Transaction) => {
          const newP = {
            name: information?.name,
            image: images[0]?.url?.url,
            bar_code: information?.bar_code,
            sku: information?.sku,
            brand: information?.brand,
            bulk_order: information?.bulk_order,
            category: information?.category,
            description: information?.description,
            manufacture: information?.manufacture,
            purchase_rate: information?.purchase_rate,
            retail_rate: information?.retail_rate,
            status: information?.status,
            subCategory: information?.subCategory,
            title: information?.name,
            unit: information?.unit,
            units: information?.units,
            store_id: information?.store_id,
            price: information?.retail_rate,
            specifications: information?.specifications,
          };
          //adding new product
          const product = await this.ProductsRepository.create(newP, {
            transaction: transaction,
          });
          //adding product images
          const image = await this.productsImageService.create(
            product,
            images,
            transaction
          );
          //adding product variants.
          const variant = await this.productVariantsService.create(
            product,
            variants,
            transaction
          );
          //if any of the above service failed no new product will be created.
          return { product, image, variant };
        }
      );
      return new DataResponseDto(
        response,
        true,
        "Successfully Added new Product"
      );
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async updateProductDetails(id: number, data: UpdateProductsDto) {
    try {
      const product = await this.findById(id);
      product.name = data.name;
      product.image = data.image?.url;
      product.bar_code = data.bar_code;
      product.sku = data.sku;
      product.brand = data.brand;
      product.bulk_order = data.bulk_order;
      product.category = data.category;
      product.description = data.description;
      product.manufacture = data.manufacture;
      product.purchase_rate = data.purchase_rate;
      product.retail_rate = data.retail_rate;
      product.status = data.status;
      product.subCategory = data.subCategory;
      product.title = data.title;
      product.unit = data.unit;
      product.units = data.units;
      product.price = data.price;
      product.specifications = data.specifications;
      const updatedData = await product.save();
      return new DataResponseDto(updatedData, true, "Successfully Updated");
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }

  async updateProductImages(pid: number, data: UpdateProductImagePayloadDto) {
    try {
      const updated = await this.productsImageService.updateProductImages(
        pid,
        data?.addImages,
        data?.removeImages
      );
      return new DataResponseDto(updated, true, "Product Images updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async updateProductStatus(pid: number, data: UpdateProductStatusDto) {
    try {
      const result = await this.ProductsRepository.sequelize.transaction(
        async (transaction: Transaction) => {
          const updated = await this.ProductsRepository.findByPk(pid, {
            transaction: transaction,
          });
          if (!updated) throw new Error("No Product Found");
          updated.status = data?.status;
          await updated.save({ transaction: transaction });
          return updated;
        }
      );
      return new DataResponseDto(
        result,
        true,
        "Product Status Updated successfully"
      );
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
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
  async findOne(id: number) {
    try {
      const data = await this.ProductsRepository.findByPk<Products>(id, {
        include: [
          {
            model: Category,
            required: true,
            attributes: ["name"],
          },
          {
            model: SubCategory,
            required: true,
            attributes: ["name"],
          },
          {
            model: ProductImage,
            required: false,
            attributes: pImageAttributes,
          },
          {
            model: ProductVariant,
            required: false,
            attributes: pVariantAttributes,
          },
          { model: Store, required: true, attributes: ["store_name"] },
        ],
      });
      if (!data) {
        throw new HttpException("No ID founds", HttpStatus.NOT_FOUND);
      }
      return new DataResponseDto(data, true, "Success");
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }
  async getProductsBySubCategory(pageOptionsDto: ProductSearchPageOptionsDto) {
    const { id, take, page, order, price } = pageOptionsDto;
    const skip = (page - 1) * take;
    try {
      const products: any = await this.ProductsRepository.findAndCountAll({
        where: {
          subCategory: id,
          status: true,
        },
        limit: take,
        order:
          order == "DESC"
            ? [["updatedAt", order]]
            : order == "ASC" && price == "RAND"
            ? []
            : [["price", price]],
        offset: skip,
      });
      const itemCount = products.count;
      const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
      return { data: products?.rows, meta: pageMetaDto };
    } catch (err) {
      return { data: [], meta: {} };
    }
  }
  // async bulkCreate(data: CreateProductsDto[]) {
  //   try {
  //     if (Array.isArray(data) == false || data.length == 0)
  //       throw new Error("Invalid Input");
  //     const array = data.map((item: any) => {
  //       const rand = Math.floor(Math.random() * 100000);
  //       return {
  //         name: item.name,
  //         image: String(item.image),
  //         bar_code: "NX"+rand,
  //         sku: "SK"+rand,
  //         brand: "Fortunes",
  //         bulk_order: false,
  //         category: Number(item.category),
  //         description: item.description,
  //         specifications:`Presenting the best ${item.name}  for you from nextme`,
  //         manufacture: "NextMecorp",
  //         purchase_rate: Number(item.price),
  //         retail_rate: Number(item.price)+100,
  //         status: true,
  //         subCategory: Number(item.subCategory),
  //         title: item.name,
  //         unit: 20,
  //         units:30,
  //         store_id: Number(item.store_id),
  //         price: Number(item.price),
  //       };
  //     });
  //     const created = await this.ProductsRepository.bulkCreate(array, {
  //       validate: true,
  //     });
  //     return new DataResponseDto(created, true, "Successfully Created");
  //   } catch (err) {
  //     console.log(err);
  //     return new DataResponseDto([], false, err.message);
  //   }
  // }
}

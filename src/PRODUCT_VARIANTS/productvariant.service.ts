import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ProductVariant } from "./productvariant.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateProductVariantDto } from "./dto/createProductVariant.dto";
import { UpdateProductVariantDto } from "./dto/updateProductVariant.dto";
import { Products } from "../PRODUCTS/products.entity";
import { Transaction } from "sequelize";

@Injectable()
export class ProductVariantService {
  constructor(
    @Inject("ProductVariantRepository")
    private readonly ProductVariantRepository: typeof ProductVariant
  ) {}

  async create(
    product: Products,
    variant: CreateProductVariantDto[],
    transaction: Transaction
  ) {
    if (Array.isArray(variant) == false) return [];
    if (product?._id == null) return [];
    if (variant.length == 0) return [];
    else {
      try {
        const newVariants = [];
        for (const item of variant) {
          const varie = await this.ProductVariantRepository.create(
            {
              name: product.name,
              productId: product._id,
              available: item.available,
              barcode: item.barcode,
              image: item.image?.url?.url,
              price: Number(item.price),
              sku: item.sku,
              units: Number(item.units),
              combination: item.combination,
            },
            { transaction: transaction }
          );
          newVariants.push(varie);
        }
        return newVariants;
      } catch (err) {
        throw new Error("Failed to Add Variants," + err.message);
      }
    }
  }
  async addNewVariants(
    productId: number,
    name: string,
    variant: CreateProductVariantDto[]
  ) {
    if (Array.isArray(variant) == false)
      return new DataResponseDto([], false, "Invalid Input, Please try again.");
    if (productId == null)
      return new DataResponseDto([], false, "Invalid Product Id found.");
    if (variant.length == 0)
      return new DataResponseDto([], false, "No Variants are found to add.");
    else {
      try {
        const newVar = [];
        for (const item of variant) {
          const varie = await this.ProductVariantRepository.create({
            name: name,
            productId: Number(productId),
            available: item.available,
            barcode: item.barcode,
            image: item.image?.url?.url,
            price: Number(item.price),
            sku: item.sku,
            units: Number(item.units),
            combination: item.combination,
          });
          newVar.push(varie);
        }
        return new DataResponseDto(newVar, true, "Successfully Added");
      } catch (err) {
        return new DataResponseDto([], false, "Failed, " + err.message);
      }
    }
  }
  async deleteVariant(id: number) {
    try {
      const deleted = await this.ProductVariantRepository.destroy({
        where: {
          id: id,
        },
      });
      return new DataResponseDto({}, true, "Variant Deleted Successfully");
    } catch (err) {
      console.log(err);
      return new DataResponseDto({}, false, err.message);
    }
  }
}

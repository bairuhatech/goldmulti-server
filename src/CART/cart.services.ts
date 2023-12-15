import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CartTable } from "./cart.entity";
import { CartDto } from "./dto/cart.dto";
import { CartUpdateDto } from "./dto/cart_update.dto";
import { CreateCartDto } from "./dto/cart_create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ProductsService } from "../PRODUCTS/products.services";
import { Products } from "../PRODUCTS/products.entity";
import { Op, Transaction } from "sequelize";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";
import { Store } from "../STORE/store.entity";

@Injectable()
export class CartServices {
  constructor(
    @Inject("cartRepository")
    private readonly cartRepository: typeof CartTable,
    private readonly productService: ProductsService
  ) {}

  async findByUserId(id: number) {
    try {
      const cart = await this.cartRepository.findAll({
        where: {
          userId: id,
        },
        order: [["createdAt", "DESC"]],
        include: [{ model: Store, required: true, attributes: ["store_name"] }],
      });
      return new DataResponseDto(cart, true, "Success");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async findById(id: number) {
    try {
      const data = await this.cartRepository.findByPk<CartTable>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (err) {
      return;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.findById(id);
      await result.destroy();
      return new DataResponseDto(
        result,
        true,
        "Successfully Removed item from cart"
      );
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async create(data: CreateCartDto) {
    try {
      const whereCondition = {
        productId: data?.productId,
        userId: data?.userId,
      };
      if (data?.variantId) {
        whereCondition["variantId"] = data?.variantId;
      }
      const ifExist = await this.cartRepository.findOne({
        where: whereCondition,
      });
      if (!ifExist) {
        //if the selected product is not available in cart
        const cart = new CartTable();
        cart.userId = data.userId;
        cart.productId = data.productId;
        cart.quantity = data.quantity;
        cart.buyPrice = data?.price;
        cart.totalPrice = data?.price * data?.quantity;
        cart.storeId = data?.storeId;
        cart.variantId = data?.variantId;
        cart.image = data?.image;
        cart.name = data?.name;
        cart.combination = data?.combination;
        await cart.save();
      }
      if (ifExist) {
        //iff the product alredy available in user's cart
        ifExist.quantity += data?.quantity;
        ifExist.totalPrice = data?.price * ifExist.quantity;
        await ifExist.save();
      }

      return new DataResponseDto({}, true, "Successfully Added to cart");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async update(id: number, data: CartUpdateDto) {
    try {
      const cartItem = await this.findById(id);
      cartItem.totalPrice = data?.price * data?.quantity;
      cartItem.quantity = data?.quantity;
      await cartItem.save();

      return new DataResponseDto(cartItem, true, "Successfully updated Cart.");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }
  async removeFromCart(data: number[], transaction: Transaction) {
    try {
      const deleted = await this.cartRepository.destroy({
        where: {
          id: { [Op.in]: data },
        },
        transaction: transaction,
      });
      return deleted;
    } catch (err) {
      throw new Error("Failed to Remove Item from Cart");
    }
  }
}

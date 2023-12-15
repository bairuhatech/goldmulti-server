import { User } from "./../user/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { Cart } from "./cart.entity";
import { CartDto } from "./dto/cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";

@Injectable()
export class CartsService {
  constructor(
    @Inject("CartsRepository")
    private readonly cartsRepository: typeof Cart
  ) {}

  async findAll() {
    const carts = await this.cartsRepository.findAll<Cart>();
    return carts.map((cart) => new CartDto(cart));
  }

  async findOne(id: number) {
    const cart = await this.cartsRepository.findByPk<Cart>(id, {
      include: [User],
    });
    if (!cart) {
      throw new HttpException("No cart found", HttpStatus.NOT_FOUND);
    }
    return new CartDto(cart);
  }

  async create(userId: string, createCartDto: CreateCartDto) {
    const cart = new Cart();
    cart.user_id = createCartDto.user_id;
    cart.product_id = createCartDto.product_id;
    cart.description = createCartDto.description;
    cart.image = createCartDto.image;
    cart.size = createCartDto.size;
    cart.rentPrice = createCartDto.rentPrice;
    cart.buyPrice = createCartDto.buyPrice;
    cart.mrp = createCartDto.mrp;
    cart.type = createCartDto.type;
    cart.days = createCartDto.days;
    cart.form_date = createCartDto.form_date;
    cart.to_date = createCartDto.to_date;
    cart.quantity = createCartDto.quantity;
    cart.list_rent = createCartDto.list_rent;
    cart.grand_total = createCartDto.grand_total;
    return cart.save();
  }
}

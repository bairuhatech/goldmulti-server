import { User } from "../user/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CreateProduct_viewDto } from "./dto/create-product_view.dto";
import { Product_view } from "./product_view.entity";
import { Product_viewDto } from "./dto/product_view.dto";
import { UpdateProduct_viewDto } from "./dto/update-product_view.dto";

@Injectable()
export class Product_viewsService {
  constructor(
    @Inject("Product_viewsRepository")
    private readonly product_viewsRepository: typeof Product_view
  ) {}

  async findAll() {
    const product_views =
      await this.product_viewsRepository.findAll<Product_view>();
    return product_views.map(
      (product_view) => new Product_viewDto(product_view)
    );
  }

  async findOne(id: number) {
    const product_view =
      await this.product_viewsRepository.findByPk<Product_view>(id, {
        include: [User],
      });
    if (!product_view) {
      throw new HttpException("No product_view found", HttpStatus.NOT_FOUND);
    }
    return new Product_viewDto(product_view);
  }

  async create(createProduct_viewDto: CreateProduct_viewDto) {
    const product_view = new Product_view();
    product_view.user_id = createProduct_viewDto.user_id;
    product_view.product_id = createProduct_viewDto.product_id;
    return product_view.save();
  }
}

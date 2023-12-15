import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ProductReviews } from "./prod_rev.entity";
import { CreateProductReviewsDto } from "./dto/create.dto";
import { ProductReviewsDto } from "./dto/prod_rev.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { PageOptionsDtoReview } from "./dto/pageOptionReview.dto";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
@Injectable()
export class ProductReviewsService {
  constructor(
    @Inject("ProductReviewsRepository")
    private readonly ProductReviewsRepository: typeof ProductReviews
  ) { }

  async findById(id: number) {
    try {
      const data = await this.ProductReviewsRepository.findByPk<ProductReviews>(id, {});
      if (!data) {
        throw new HttpException('No ID found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) { }
  }

  async findAll(pageOptionsDto:PageOptionsDtoReview) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    try {
      const allList = await this.ProductReviewsRepository.findAndCountAll<ProductReviews>({
        where:{
          product_id:pageOptionsDto.productId
        },
        limit: pageOptionsDto.take,
        offset: skip,
        order:[['createdAt',"DESC"]]
      });
      const data = allList?.rows;
      const itemCount = allList.count;
      const meta = new PageMetaDto({ pageOptionsDto, itemCount });
      
      return new DataResponseDtoPagination(data,true,"Success",meta);
    } catch (err) {
      return new DataResponseDtoPagination([],false,err.message,{});
    }
  }

  async create(create: CreateProductReviewsDto) {
    try {
      const subCategory = new ProductReviews()
      subCategory.product_id = create.product_id
      subCategory.user_id = create.user_id
      subCategory.message = create.message
      subCategory.rating = create.rating
      subCategory.userName=create.userName;
      const createData = await subCategory.save()
      return new DataResponseDto(createData,true,"Successfully created");
    } catch (err) {
      return new DataResponseDto({},false,err.message);
     }
  }

  async update(id: number, data: CreateProductReviewsDto) {
    try {
      const subCategory = await this.findById(id);
      subCategory.product_id = data.product_id
      subCategory.user_id = data.user_id
      subCategory.message = data.message
      subCategory.rating = data.rating
      subCategory.userName=data.userName;
      const updatedData = await subCategory.save()
      return new DataResponseDto(updatedData,true,"Successfully Updated");
    } catch (err) {
      return new DataResponseDto({},false,err.message);
     }
  }

  async delete(id: number) {
    try {
      const pkId = await this.findById(id);
      await pkId.destroy();
      return new DataResponseDto(pkId,true,"Successfully deleted");
    } catch (err) {
      return new DataResponseDto({},false,err.message);
     }
  }
}

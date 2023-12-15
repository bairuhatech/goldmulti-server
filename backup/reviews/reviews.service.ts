import { User } from "../user/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CreateReviewsDto } from "./dto/create-reviews.dto";
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { ReviewsDto } from "./dto/reviews.dto";
import { Reviews } from "./reviews.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @Inject("ReviewsRepository")
    private readonly reviewsRepository: typeof Reviews
  ) {}

  async findAll() {
    const reviews = await this.reviewsRepository.findAll<Reviews>();
    return reviews.map((review) => new ReviewsDto(review));
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findByPk<Reviews>(id, {
      include: [User],
    });
    if (!review) {
      throw new HttpException("No review found", HttpStatus.NOT_FOUND);
    }
    return new ReviewsDto(review);
  }

  async create(createReviewDto: CreateReviewsDto) {
    const review = new Reviews();
    review.product_id = createReviewDto.product_id;
    review.user_id = createReviewDto.user_id;
    return review.save();
  }
}

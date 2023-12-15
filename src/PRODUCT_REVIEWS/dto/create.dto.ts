import { ApiProperty } from "@nestjs/swagger";

export class CreateProductReviewsDto {
   @ApiProperty()
   readonly product_id: number;

   @ApiProperty()
   readonly user_id: number;

   @ApiProperty()
   readonly userName: string;

   @ApiProperty()
   readonly message: string;

   @ApiProperty()
   readonly rating: number;
}
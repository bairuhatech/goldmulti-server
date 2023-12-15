import { ApiProperty } from "@nestjs/swagger";

export class CreateSubCategoryDto {
   @ApiProperty()
   readonly name: string;

   @ApiProperty()
   readonly description: string;

   @ApiProperty()
   readonly image: string;

   @ApiProperty()
   readonly category_id: number;
}
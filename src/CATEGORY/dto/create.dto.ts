import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
   @ApiProperty()
   readonly name: string;

   @ApiProperty()
   readonly image: string;

   @ApiProperty()
   readonly description: string;
}
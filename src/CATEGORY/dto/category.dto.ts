import { Category } from "./../category.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly description: string;

  constructor(cat: Category) {
    this.id = cat.id
    this.name = cat.name;
    this.image = cat.image;
    this.description=cat.description;
  }
}

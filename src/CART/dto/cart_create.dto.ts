import { ApiProperty } from "@nestjs/swagger";
export class CreateCartDto {
  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly productId: number;

  @ApiProperty()
  readonly variantId: number;

  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly image: string;
  
  @ApiProperty()
  readonly storeId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly combination: JSON;
}

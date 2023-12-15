import { ApiProperty } from "@nestjs/swagger";
import { bool } from "aws-sdk/clients/signer";

export class CreateProductsDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly image: image;

  @ApiProperty()
  readonly bar_code: string;

  @ApiProperty()
  readonly sku: string;

  @ApiProperty()
  readonly brand: string;

  @ApiProperty()
  readonly bulk_order: boolean;

  @ApiProperty()
  readonly category: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly specifications: string;

  @ApiProperty()
  readonly manufacture: string;

  @ApiProperty()
  readonly purchase_rate: number;

  @ApiProperty()
  readonly retail_rate: number;

  @ApiProperty()
  readonly status: boolean;

  @ApiProperty()
  readonly subCategory: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly unit: number;

  @ApiProperty()
  readonly units: number;

  @ApiProperty()
  readonly store_id: number;

  @ApiProperty()
  readonly price: number;
}
type image = {
  url: string;
  status: boolean;
};

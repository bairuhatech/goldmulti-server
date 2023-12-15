import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../../USERS/dto/user.dto";
import { AddressDto } from "../../ADDRESS/dto/address.dto";
export class CreateOrderDto {
  @ApiProperty()
  readonly user: UserDto;

  @ApiProperty()
  readonly cart: CartItemDto[];

  @ApiProperty()
  readonly payment: paymentType;

  @ApiProperty()
  readonly address: AddressDto;
}
export class CartItemDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly productId: number;

  @ApiProperty()
  readonly variantId: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly storeId: number;

  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly productDetails: ProductItemDto;

  @ApiProperty()
  readonly buyPrice: number;
}

type ProductItemDto = {
  readonly image: string;
  readonly name: string;
  readonly price: number;
};

type paymentType = {
  name: string;
};

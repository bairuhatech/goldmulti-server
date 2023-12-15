import { ApiProperty } from "@nestjs/swagger";
import { Wishlist } from "../wishlist.entity";

export class WishlistDto {
	@ApiProperty()
	readonly id: number;

	@ApiProperty()
	readonly userId: number;

	@ApiProperty()
	readonly productId: number;

	@ApiProperty()
	readonly description: string;

	@ApiProperty()
	readonly image: string;

	@ApiProperty()
	readonly buyPrice: number;

	@ApiProperty()
	readonly sellerId: number;

	@ApiProperty()
	readonly name: string;

	constructor(wishlist: Wishlist) {
		this.id = wishlist.id;
		this.userId = wishlist.userId;
		this.productId = wishlist.productId;
		this.description=wishlist.description;
		this.image=wishlist.image;
		this.buyPrice=wishlist.buyPrice;
		this.sellerId=wishlist.sellerId;
		this.name=wishlist.name;
	}
}

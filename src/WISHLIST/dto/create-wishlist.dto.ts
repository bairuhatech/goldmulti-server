import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsDate, IsBoolean } from "class-validator";

export class CreateWishlistDto {
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
}

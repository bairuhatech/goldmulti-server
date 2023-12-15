import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {
	@ApiProperty()
	readonly storeId: number;

	@ApiProperty()
	readonly description: string;

	@ApiProperty()
	readonly img_desk: string;

	@ApiProperty()
	readonly img_mob: string;

	@ApiProperty()
	readonly status: boolean;

	@ApiProperty()
	readonly title: string;
}

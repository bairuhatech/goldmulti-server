import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
	@ApiProperty()
	readonly userId: number;

	@ApiProperty()
	readonly flat: string;

	@ApiProperty()
	readonly fullAddress: string;

	@ApiProperty()
	readonly pin_code: string;

	@ApiProperty()
	readonly state: string;

	@ApiProperty()
	readonly city: string;

	@ApiProperty()
	readonly street: string;

	@ApiProperty()
	readonly alt_phone: string;

	@ApiProperty()
	readonly geo_location: string;

	@ApiProperty()
	readonly type: string;
}


import { ApiProperty } from "@nestjs/swagger";

export class CreateEnquiryDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly message: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class DataResponseDto {
  @ApiProperty()
  readonly statusCode: Number;
  @ApiProperty()
  readonly status: boolean;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly data: any;

  constructor(data: any, status: boolean, message: string) {
    this.statusCode = status ? 200 : 400;
    this.status = status;
    this.message = message;
    this.data = status ? data : null;
  }
}

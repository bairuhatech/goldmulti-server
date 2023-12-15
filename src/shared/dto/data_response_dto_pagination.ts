import { ApiProperty } from "@nestjs/swagger";

export class DataResponseDtoPagination {
  @ApiProperty()
  readonly statusCode: Number;
  @ApiProperty()
  readonly status: boolean;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly data: any;
  @ApiProperty()
  readonly meta: any;

  constructor(data: any, status: boolean, message: string, meta: any) {
    this.statusCode = status ? 200 : 400;
    this.status = status;
    this.message = message;
    this.data = status ? data : null;
    this.meta = meta;
  }
}

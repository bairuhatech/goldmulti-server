import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  message: string;

  constructor(data: T[], status: boolean, message: string, meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
    this.status = status;
    this.message = message;
  }
}

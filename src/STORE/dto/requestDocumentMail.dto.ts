import { ApiProperty } from "@nestjs/swagger";

export class RequestDocumentMailDto {
  @ApiProperty()
  readonly to: string;

  @ApiProperty()
  readonly subject: string;

  @ApiProperty()
  readonly id: number;
}

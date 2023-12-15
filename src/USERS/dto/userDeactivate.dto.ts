import { ApiProperty } from "@nestjs/swagger";

export class UserDeactivateDto {
  @ApiProperty()
  readonly status: boolean;
}

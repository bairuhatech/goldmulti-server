import { ApiProperty } from "@nestjs/swagger";

export class UserEmailUpdateDto {
  @ApiProperty()
  readonly email: string;
}

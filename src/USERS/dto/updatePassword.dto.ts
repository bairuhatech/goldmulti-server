import { ApiProperty } from "@nestjs/swagger";

export class UserPasswordUpdateDto {
  @ApiProperty()
  readonly oldPassword: string;

  @ApiProperty()
  readonly newPassword: string;
}

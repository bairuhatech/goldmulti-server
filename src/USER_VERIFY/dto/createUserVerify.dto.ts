import { ApiProperty } from "@nestjs/swagger";

export class CreateUserVerifyDto {
  @ApiProperty()
  readonly userId: number;
}
export class VerifyUserTokenDto {
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly token: string;
}

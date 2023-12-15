import { ApiProperty } from "@nestjs/swagger";

export class signup_Request {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly countrycode: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly phone_verify: boolean;

  @ApiProperty()
  readonly type: string;
}

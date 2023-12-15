import { ApiProperty } from "@nestjs/swagger";

export class login_Request {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}

export class login_phone {
  @ApiProperty()
  readonly code: string;
  @ApiProperty()
  readonly phone: string;
}

export class login_google {
  @ApiProperty()
  readonly first_name: string;
  @ApiProperty()
  readonly last_name: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly image: string;
  @ApiProperty()
  readonly type: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateTestTableDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly dob: Date;

  @ApiProperty()
  readonly password: string;
}

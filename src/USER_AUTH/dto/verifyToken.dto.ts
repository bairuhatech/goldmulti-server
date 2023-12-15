import { ApiProperty } from "@nestjs/swagger";

export class VerifyUserTokenDto {
    @ApiProperty()
    readonly userId: number;
    @ApiProperty()
    readonly token: string;
  }
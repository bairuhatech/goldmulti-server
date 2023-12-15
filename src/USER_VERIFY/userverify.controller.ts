import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { UserVerifyService } from "./userverify.service";
import { CreateUserVerifyDto, VerifyUserTokenDto } from "./dto/createUserVerify.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";

@Controller("userverify")
@ApiTags("userverify")
export class UserVerifyController {
  constructor(private readonly userverifyService: UserVerifyService) {}

  
}

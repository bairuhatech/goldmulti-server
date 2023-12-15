import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiParam,
  ApiTags,
  ApiOkResponse,
} from "@nestjs/swagger";

import { UserService } from "./user.services";
import { UserDto } from "./dto/user.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { User } from "./user.entity";
import { UserEmailUpdateDto } from "./dto/user_email.update.dto";
import { UserPhoneUpdateDto } from "./dto/user_phone.update.dto";
import { UserNameUpdateDto } from "./dto/user_name.update.dto";
import { UserUpdateDto } from "./dto/user_update.dto";
import { UserDeactivateDto } from "./dto/userDeactivate.dto";
import { UserPasswordUpdateDto } from "./dto/updatePassword.dto";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @ApiBearerAuth()
  findAll(@Query() data: any): any {
    return this.UserService.findAll(data);
  }
  @Get(":id")
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true })
  findOne(@Param("id") _id: any): any {
    return this.UserService.findOne(_id);
  }
  @Put("deactivate/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  deactivateUser(
    @Param("id") id: number,
    @Body() data: UserDeactivateDto
  ): Promise<DataResponseDto> {
    return this.UserService.deactivateUser(id, data);
  }
  @Put("/update-name/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateDto: UserNameUpdateDto
  ): Promise<DataResponseDto> {
    return this.UserService.updateName(id, updateDto);
  }

  @Put("update-password/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  update1(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateDto: UserPasswordUpdateDto
  ): Promise<DataResponseDto> {
    return this.UserService.updatePassword(id, updateDto);
  }
  @Put("add-password/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  addPassword(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateDto: UserPasswordUpdateDto
  ): Promise<DataResponseDto> {
    return this.UserService.addPassword(id, updateDto);
  }
  @Put("role/update/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  updateRole(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateDto: any
  ): Promise<any> {
    return this.UserService.updateRole(id, updateDto);
  }

  @Put("/update-email/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  update3(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateDto: UserEmailUpdateDto
  ): Promise<DataResponseDto> {
    return this.UserService.updateEmail(id, updateDto);
  }

  @Put("/update-photo/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  update5(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateDto: UserUpdateDto
  ): Promise<DataResponseDto> {
    return this.UserService.updatePhoto(id, updateDto);
  }

  @Put("/update-Phone/:id")
  @ApiOkResponse({ type: User })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update4(
    @Param("id") id: number,
    @Body() data: UserPhoneUpdateDto
  ): Promise<any> {
    return this.UserService.updatePhone(id, data);
  }
}

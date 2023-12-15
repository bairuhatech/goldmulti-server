import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Address } from "./address.entity";
import { AddressDto } from "./dto/address.dto";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("address")
@ApiTags("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get("all/:id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: [AddressDto] })
  findAll(@Param("id", ParseIntPipe) id: number): any {
    return this.addressService.findAll(id);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<AddressDto> {
    const banner = await this.addressService.findOne(id);
    if (!banner) throw new NotFoundException("Address not found");
    return new AddressDto(banner);
  }

  @Post()
  @ApiCreatedResponse({ type: [Address] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() createAddressDto: CreateAddressDto): Promise<DataResponseDto> {
    return this.addressService.create(createAddressDto);
  }

  @Put(":id")
  @ApiOkResponse({ type: Address })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateAddressDto: CreateAddressDto
  ): Promise<DataResponseDto> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: Address })
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(@Param("id", new ParseIntPipe()) id: number): any {
    return this.addressService.delete(id);
  }
}

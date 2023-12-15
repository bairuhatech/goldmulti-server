import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Enquiry } from "./enquiry.entity";
import { EnquiryDto } from "./dto/enquiry.dto";
import { EnquiryService } from "./enquiry.service";
import { CreateEnquiryDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("Enquiry")
@ApiTags("Enquiry")
export class EnquiryController {
  constructor(private readonly EnquiryService: EnquiryService) {}

  @Get("get")
  @ApiOkResponse({ type: [EnquiryDto] })
  findAll() {
    return this.EnquiryService.findAll();
  }

  @Post("post")
  @ApiCreatedResponse({ type: [Enquiry] })
  @ApiBearerAuth()
  create(@Body() createEnquiryDto: CreateEnquiryDto): Promise<DataResponseDto> {
    return this.EnquiryService.create(createEnquiryDto);
  }
}

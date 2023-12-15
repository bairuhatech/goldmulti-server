import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

import { SubCategoryService } from "./sub_category.services";
import { SubCategoryDto } from "./dto/sub_category.dto";
import { SubCategory } from "./sub_category.entity";
import { CreateSubCategoryDto } from "./dto/create.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

@Controller("subCategory")
@ApiTags("subCategory")
export class SubCategoryController {
  constructor(private readonly SubCategoryService: SubCategoryService) { }

  @Get('all')
  @ApiBearerAuth()
  @ApiOkResponse({ type: [SubCategory] })
  findAll(): Promise<DataResponseDto> {
    return this.SubCategoryService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id') id: any): any {
    return this.SubCategoryService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: [SubCategory] })
  @HttpCode(200)
  @ApiBearerAuth()
  create(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<DataResponseDto> {
    return this.SubCategoryService.create(createSubCategoryDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: SubCategory })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSubCategoryDto: CreateSubCategoryDto,
  ): Promise<DataResponseDto> {
    return this.SubCategoryService.update(id, updateSubCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SubCategory })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  delete(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DataResponseDto> {
    return this.SubCategoryService.delete(id);
  }
}

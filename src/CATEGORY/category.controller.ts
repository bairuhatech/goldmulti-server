import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

import { Category } from "./category.entity";
import { CategoryDto } from "./dto/category.dto";
import { CreateCategoryDto } from "./dto/create.dto";
import { CategoryService } from "./category.services";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) { }

  @Get('all')
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CategoryDto] })
  findAll(@Query() pageOpt: PageOptionsDto,): any {
    return this.CategoryService.findAll(pageOpt);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id') id: any): any {
    return this.CategoryService.findById(id);
  }


  @Post()
  @ApiCreatedResponse({ type:[Category]})
  @HttpCode(200)
  @ApiBearerAuth()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<DataResponseDto> {
    return this.CategoryService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Category })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createProductsDto: CreateCategoryDto,
  ): Promise<DataResponseDto> {
    return this.CategoryService.update(id, createProductsDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Category })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  delete(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DataResponseDto> {
    return this.CategoryService.delete(id);
  }
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [Category] })
  findAllCategory(): Promise<DataResponseDto> {
    return this.CategoryService.findAllCategory();
  }
}

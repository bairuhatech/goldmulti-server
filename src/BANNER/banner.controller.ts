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
	Query,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiTags,
} from "@nestjs/swagger";
import { BannerService } from "./banner.service";
import { BannerDto } from "./dto/banner.dto";
import { CreateBannerDto } from "./dto/create.dto";
import { Banner } from "./banner.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";

@Controller("banner")
@ApiTags("banner")
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Get("all")
	@ApiBearerAuth()
	@ApiOkResponse({ type: [BannerDto] })
	findAll( @Query() pageOpt: PageOptionsDto,):Promise<any> {
		return this.bannerService.findAll(pageOpt);
	}

	@Get(":id")
	@ApiBearerAuth()
	@ApiParam({ name: "id", required: true })
	findOne(@Param("id") id: any): any {
		return this.bannerService.findById(id);
	}

	@Post()
	@ApiCreatedResponse({ type: [Banner] })
	@HttpCode(200)
	@ApiBearerAuth()
	create(@Body() createBannerDto: CreateBannerDto): Promise<DataResponseDto> {
		return this.bannerService.create(createBannerDto);
	}

	@Put(":id")
	@ApiOkResponse({ type: Banner })
	@ApiParam({ name: "id", required: true })
	@ApiBearerAuth()
	update(
		@Param("id", new ParseIntPipe()) id: number,
		@Body() createBannerDto: CreateBannerDto
	): Promise<DataResponseDto> {
		return this.bannerService.update(id, createBannerDto);
	}

	@Delete(":id")
	@ApiOkResponse({ type: Banner })
	@ApiParam({ name: "id", required: true })
	@ApiBearerAuth()
	delete(@Param("id", new ParseIntPipe()) id: number): Promise<DataResponseDto> {
		return this.bannerService.delete(id);
	}
}

import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '@nestjs/passport';
import { Notification as NotificationEntity } from './notification.entity';
import { NotificationDto } from './dto/notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    @ApiOkResponse({ type: [NotificationDto] })
    findAll(): Promise<NotificationDto[]> {
        return this.notificationsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: NotificationDto })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<NotificationDto> {
        return this.notificationsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: NotificationEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createNotificationDto: CreateNotificationDto,
        @Req() request,
    ): Promise<NotificationEntity> {
        return this.notificationsService.create(request.user.id, createNotificationDto);
    }


}

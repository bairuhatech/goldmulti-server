import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { notificationsProviders } from './notifications.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [NotificationsService, ...notificationsProviders],
    exports: [],
})
export class NotificationModule {}

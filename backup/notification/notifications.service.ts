import { User } from "../user/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./notification.entity";
import { NotificationDto } from "./dto/notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(
    @Inject("NotificationsRepository")
    private readonly notificationsRepository: typeof Notification
  ) {}

  async findAll() {
    const notifications =
      await this.notificationsRepository.findAll<Notification>();
    return notifications.map(
      (notification) => new NotificationDto(notification)
    );
  }

  async findOne(id: number) {
    const notification =
      await this.notificationsRepository.findByPk<Notification>(id, {
        include: [User],
      });
    if (!notification) {
      throw new HttpException("No notification found", HttpStatus.NOT_FOUND);
    }
    return new NotificationDto(notification);
  }

  async create(userId: string, Dto: CreateNotificationDto) {
    const notification = new Notification();
    notification.type = Dto.type;
    notification.image = Dto.image;
    notification.title = Dto.title;
    notification.order_id = Dto.order_id;
    notification.userref_id = Dto.userref_id;
    notification.status = Dto.status;
    return notification.save();
  }
}

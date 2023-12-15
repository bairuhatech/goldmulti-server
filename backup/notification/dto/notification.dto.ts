import { ApiProperty } from "@nestjs/swagger";
import { Notification } from "../notification.entity";

export class NotificationDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly messgage: string;

  @ApiProperty()
  readonly order_id: string;

  @ApiProperty()
  readonly userref_id: string;

  @ApiProperty()
  readonly status: Boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(notification: Notification) {
    this.type = notification.type;
    this.image = notification.image;
    this.title = notification.title;
    this.messgage = notification.messgage;
    this.order_id = notification.order_id;
    this.userref_id = notification.userref_id;
    this.status = notification.status;

    this.createdAt = notification.createdAt;
    this.updatedAt = notification.updatedAt;
  }
}

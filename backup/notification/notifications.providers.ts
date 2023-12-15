import { Notification } from './notification.entity';

export const notificationsProviders = [{ provide: 'NotificationsRepository', useValue: Notification }];

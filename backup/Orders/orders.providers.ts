import { Order } from "./orders.entity";

export const ordersProviders = [
  { provide: "OrderesRepository", useValue: Order },
];

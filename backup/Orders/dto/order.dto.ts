import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../orders.entity";

export class OrderDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly order_id: string;

  @ApiProperty()
  readonly user_id: string;

  @ApiProperty()
  readonly total_items: Number;

  @ApiProperty()
  readonly total: Number;

  @ApiProperty()
  readonly GST: Number;

  @ApiProperty()
  readonly Ccharge: Number;
  @ApiProperty()
  readonly discount: Number;

  @ApiProperty()
  readonly delivery_charge: Number;

  @ApiProperty()
  readonly grandTotal: Number;

  @ApiProperty()
  readonly user: Object;

  @ApiProperty()
  readonly coupen: string;

  @ApiProperty()
  readonly address: Object;

  @ApiProperty()
  readonly payments: Object;

  @ApiProperty()
  readonly seller_id: string;

  @ApiProperty()
  readonly products: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly statusHistory: string;

  @ApiProperty()
  readonly delivery_date: Date;

  @ApiProperty()
  readonly note: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(post: Order) {
    this._id = post._id;
    this.order_id = post.order_id;
    this.user_id = post.user_id;
    this.total_items = post.total_items;
    this.total = post.total;
    this.GST = post.GST;
    this.Ccharge = post.Ccharge;
    this.discount = post.discount;
    this.delivery_charge = post.delivery_charge;
    this.grandTotal = post.grandTotal;
    this.user = post.user;
    this.coupen = post.coupen;
    this.address = post.address;
    this.payments = post.payments;
    this.seller_id = post.seller_id;
    this.products = post.products;
    this.status = post.status;
    this.statusHistory = post.statusHistory;
    this.delivery_date = post.delivery_date;
    this.note = post.note;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}

import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderStatus {
    @ApiProperty()
    readonly orderId: number;
  
    @ApiProperty()
    readonly status: string;
  
    @ApiProperty()
    readonly remark: string;
  }
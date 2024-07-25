import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneratePdfDto {
  @ApiProperty()
  orderId: string;
}

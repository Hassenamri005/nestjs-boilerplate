import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  data: any;
}

import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  to: string;
  @ApiProperty()
  subject: string;
}

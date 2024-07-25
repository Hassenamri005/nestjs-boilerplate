import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: any;

  @ApiProperty()
  refreshToken: any;

  @ApiProperty()
  user: any;
}

export class ResetPasswordDto {
  @ApiProperty()
  data: any;
}

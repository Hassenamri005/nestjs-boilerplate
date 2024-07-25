//src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  refreshToken: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  newPassword: string;

  @ApiProperty()
  resetPasswordToken: string;
}

export class ResetPasswordReqDto {
  @ApiProperty()
  email: string;
}

//src/auth/auth.controller.ts

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginDto,
  RefreshTokenDto,
  ResetPasswordDto,
  ResetPasswordReqDto,
} from './dto/login.dto';
import { ResponseDto } from '../utils/response.dto';
import { UserDTO } from '../user/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUserJWT } from '../utils/auth-user-jwt.decorator';
import { AuthResponseDto } from './dto/auth-resp.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'login response',
    type: AuthResponseDto,
    isArray: false,
  })
  login(@Body() { email, password }: LoginDto): Promise<ResponseDto> {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({
    description: 'login response',
    type: AuthResponseDto,
    isArray: false,
  })
  register(@Body() user: UserDTO) {
    return this.authService.register(user);
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'login response',
    type: AuthResponseDto,
    isArray: false,
  })
  refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('request-reset-password-email')
  @ApiOkResponse({
    description: 'Request reset password',
    type: ResetPasswordDto,
    isArray: false,
  })
  requestPasswordReset(@Body() data: ResetPasswordReqDto): Promise<boolean> {
    return this.authService.requestPasswordReset(data?.email);
  }

  @Post('reset-password')
  @ApiOkResponse({
    description: 'Reset password',
    type: ResetPasswordDto,
    isArray: false,
  })
  resetPassword(@Body() dto: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'get authenticated user data',
    type: AuthResponseDto,
    isArray: false,
  })
  getAuthenticatedUser(@AuthUserJWT() jwt: string | undefined): Promise<any> {
    return this.authService.getAuthUser(jwt);
  }
}

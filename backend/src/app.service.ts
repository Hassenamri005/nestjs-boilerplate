import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}

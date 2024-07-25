// src/auth/role.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleGuard extends JwtAuthGuard {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      // If no specific roles are required, allow access
      return super.canActivate(context);
    }

    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];

    // Check if the token is defined
    if (token) {
      try {
        // Decode the token to obtain user information
        const decodedToken = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });

        // Search for the user in the database
        const foundedUser = await this.prisma.user.findUnique({
          where: { id: decodedToken?.userId },
        });

        // Check if the user has at least one of the required roles
        const hasRequiredRole = requiredRoles.some(
          (role) => foundedUser?.roleId === role,
        );

        return hasRequiredRole && super.canActivate(context);
      } catch (error) {
        // Handle token decoding errors (e.g., expired or invalid token)
        return false;
      }
    }

    // If token is undefined, deny access
    return false;
  }
}

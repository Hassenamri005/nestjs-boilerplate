//src/auth/auth.service.ts
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { USERROLES } from 'src/utils/enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async generateTokens(payload: any): Promise<any> {
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXP_IN,
    });
    return { accessToken, refreshToken };
  }

  async login(email: string, password: string): Promise<any> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password !');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const { accessToken, refreshToken } = await this.generateTokens({
      userId: user.id,
    });

    delete user?.password;
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async register(userData: any): Promise<any> {
    // Check if a user with the given email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData?.email },
    });

    if (existingUser) {
      throw new HttpException(
        `User with email ${userData?.email} already exists !`,
        400,
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(userData?.password, 10);

    // Create a new user in the database
    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        roleId: [USERROLES?.user?.id, USERROLES?.other?.id].includes(
          userData?.roleId,
        )
          ? userData.roleId
          : 3,
        verified: false,
        disponibility: {
          create: userData?.disponibility,
        },
      } as any,
      include: {
        disponibility: true,
      },
    });

    // Generate JWT for the newly registered user
    const { accessToken, refreshToken } = await this.generateTokens({
      userId: newUser?.id,
    });
    delete newUser?.password;
    // Return the user and the access token
    return {
      accessToken,
      refreshToken,
      user: newUser,
    };
  }

  async refreshToken(refreshTok: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verify(refreshTok, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Fetch user details based on the decoded user ID from refreshToken
      const user = await this.prisma.user.findUnique({
        where: { id: decoded?.userId },
        include: {
          disponibility: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found !');
      }

      // Generate new access and refresh tokens
      const { accessToken, refreshToken } = await this.generateTokens({
        userId: user?.id,
      });

      delete user?.password;
      return { accessToken, refreshToken, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token !');
    }
  }

  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      // Check if the user with the provided email exists
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new NotFoundException('User not found !');
      }

      // Generate a token for password reset (you may want to use a library for this)
      const resetPasswordToken = await this.jwtService.sign(
        { userId: user?.id },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXP_IN,
        },
      );

      // Save the reset token in the user's record
      await this.prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordToken } as any,
      });

      // Send the reset token to the user via email or another channel
      await this.mailerService.sendMail({
        to: user?.email,
        from: '"Support Team" <support@example.com>', // override default from
        subject: 'Reset Password',
        template: './requestResetPassword',
        context: {
          name: user?.firstName,
          link: `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async resetPassword(dto: ResetPasswordDto): Promise<boolean> {
    try {
      const { newPassword, resetPasswordToken } = dto;

      try {
        // Verify the reset password token and get the decoded payload
        const decoded = this.jwtService.verify(resetPasswordToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

        // Fetch user details based on the decoded user ID from the reset token
        const user = await this.prisma.user.findUnique({
          where: { id: decoded?.userId, resetPasswordToken },
        });

        if (!user) {
          throw new NotFoundException('User not found or invalid token !');
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and reset token
        await this.prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword, resetPasswordToken: null } as any,
        });

        return true;
      } catch (verifyError) {
        // Handle token verification errors
        if (verifyError.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Reset password token has expired !');
        } else {
          throw verifyError;
        }
      }
    } catch (error) {
      return false;
    }
  }

  async getAuthUser(token: any) {
    try {
      // Verify the reset password token and get the decoded payload
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!decoded) {
        throw new NotFoundException('Invalid token!');
      }

      // Fetch user details based on the decoded user ID from the reset token
      const user = await this.prisma.user.findUnique({
        where: { id: decoded?.userId },
        include: {
          disponibility: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found or invalid token !');
      }

      return { accessToken: token, user };
    } catch (error) {
      throw new NotFoundException('Invalid token!');
    }
  }
}

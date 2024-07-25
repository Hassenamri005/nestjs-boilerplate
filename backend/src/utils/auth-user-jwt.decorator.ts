import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUserJWT = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];
    return token;
  },
);

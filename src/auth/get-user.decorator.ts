import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// export const GetUser = createParamDecorator((data, req): User => {
//   console.log(req);
//   return req.user;
// });

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user && user[data] : user;
  },
);
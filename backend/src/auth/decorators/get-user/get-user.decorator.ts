import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from '../../interfaces/user-payload.interface';

interface RequestWithUser extends Request {
  user: UserPayload;
}

export const GetUser = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;

    if (!user) throw new InternalServerErrorException('No se encontró el usuario en la petición');

    if (!data) return user;

    if (!(data in user))
      throw new BadRequestException(`La propiedad ${data} no existe en el usuario`);

    return user[data];
  },
);

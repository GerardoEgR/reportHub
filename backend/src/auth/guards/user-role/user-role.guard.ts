import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../../decorators/role-protected/role-protected.decorator';
import { User } from '../../../users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] =
      this.reflector.get<string[]>(META_ROLES, context.getHandler()) || [];

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as User;

    if (!user) throw new BadRequestException('Usuario no encontrado');

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    throw new ForbiddenException('Usuario no tiene permisos para ejecutar esta acción');
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No role restriction
    }

    // 2. Get user depending on request type (REST or GraphQL)
    const user = this.getUserFromContext(context);

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // 3. Check if role matches
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `Access denied: Requires role ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }

  private getUserFromContext(context: ExecutionContext) {
    // If GraphQL request
    if (context.getType<string>() === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      return gqlCtx.getContext().req.user;
    }

    // REST request
    return context.switchToHttp().getRequest().user;
  }
}

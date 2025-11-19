import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Detect if GraphQL or REST
    const request = this.getRequest(context);

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Attach user data to request (REST + GraphQL)
      request['user'] = payload;

    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  // Support BOTH REST & GraphQL
  private getRequest(context: ExecutionContext): Request {
    // If GraphQL request
    if (context.getType<string>() === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      return gqlCtx.getContext().req;
    }

    // Otherwise REST request
    return context.switchToHttp().getRequest();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const header = request.headers.authorization;
    if (!header) return undefined;

    const [type, token] = header.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

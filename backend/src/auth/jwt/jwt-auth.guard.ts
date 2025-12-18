import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    this.logger.log(`JWT Auth attempt - Has Authorization header: ${!!authHeader}`);
    if (authHeader) {
      this.logger.log(`Authorization header value: ${authHeader.substring(0, 20)}...`);
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(`JWT Auth failed - Error: ${err?.message || 'none'}, User: ${!!user}, Info: ${info?.message || 'none'}`);

      if (info?.message === 'No auth token') {
        throw new UnauthorizedException('No authentication token provided. Please include Bearer token in Authorization header.');
      }

      if (info?.message === 'jwt malformed') {
        throw new UnauthorizedException('Invalid token format. Token must be a valid JWT.');
      }

      if (info?.message === 'jwt expired') {
        throw new UnauthorizedException('Token has expired. Please log in again.');
      }

      throw err || new UnauthorizedException('Access Denied. Please log in.');
    }

    this.logger.log(`JWT Auth successful for user: ${user.email}`);
    return user;
  }
}

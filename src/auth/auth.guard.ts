import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {
  }

  canActivate(
      context: ExecutionContext,
  ): any {

    try {
      const request = context.switchToHttp().getRequest();
      const jwt = request.cookies['jwt'];
      return this.jwtService.verify(jwt);
    }
    catch (e) {
      return false;
    }

  }
}

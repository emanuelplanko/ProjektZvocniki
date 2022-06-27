import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  //pregled če jwt obstaja in je verificiran z moje strani
  //dostop do jwtService
  constructor(private jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
    //tip "any", ne več "boolean"
  ): any {

    //za spremenljivke(const)
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

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
//https://blog.merckx.fr/globally-protect-routes-of-a-nestjs-application/
  //https://wanago.io/2021/11/15/api-nestjs-authorization-roles-claims/

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<any>();
    const bearerToken = request['headers']['authorization'] as string;
    const token = bearerToken?.replace('Bearer', '')?.trim();

    if (!token) {
      return false;
    }
    return this.validate(token);
  }

  private validate(token: string): boolean {
    const jwtService = new JwtService({});
    const { exp, email, user_metadata } = jwtService.decode(token) as any;
    const expired = Date.now() >= exp * 1000;

    const emailEncoded = Buffer.from(email, 'base64').toString('binary');
    if (!expired && user_metadata.code === 'OWE-KEY' && user_metadata.token === emailEncoded) {
      return true;
    }
    return false;
  }
}

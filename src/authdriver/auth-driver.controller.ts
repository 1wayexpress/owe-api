import { Controller, Post, Body } from '@nestjs/common';
import { AuthOneService } from './auth-driver.service';

@Controller('authdOne')
export class AuthDriverController {
  constructor(private readonly idmService: AuthOneService) {}

  @Post('signInDriver')
  signInDriver(@Body() loginDto: { key: string; code: string }) {
    if (!loginDto || !loginDto.code || !loginDto.key)
      return { error: 'Invalid Data' };
    return this.idmService.signInDriver(loginDto);
  }

  @Post('signInClient')
  signInClient(@Body() loginDto: { key: string; code: string }) {
    if (!loginDto || !loginDto.code || !loginDto.key)
      return { error: 'Invalid Data' };
    return this.idmService.signInClient(loginDto);
  }
}

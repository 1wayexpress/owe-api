import { Module } from '@nestjs/common';
import { AuthOneService } from './auth-driver.service';
import { AuthDriverController } from './auth-driver.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../authn/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [AuthDriverController],
  providers: [AuthOneService],
})
export class AuthDriverModule {}

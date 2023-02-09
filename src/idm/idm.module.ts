import { Module } from '@nestjs/common';
import { IdmService } from './idm.service';
import { IdmController } from './idm.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../authn/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [IdmController],
  providers: [IdmService],
})
export class IdmModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthDriverModule } from './authdriver/auth-driver.module';
import { BroadcastingModule } from './broadcasting/broadcasting.module';
import { IdmModule } from './idm/idm.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IdmModule,
    BroadcastingModule,
    AuthDriverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

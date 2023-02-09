import { Module } from '@nestjs/common';
import { SMSService } from './sms.service';
import { SMSController } from './sms.controller';
import { TwilioFactoryService } from './twilio.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../authn/auth.module';
import { AZcommunicationService } from './azure-com.service';

@Module({
  imports: [
    ConfigModule,
    AuthModule
  ],
  controllers: [SMSController],
  providers: [SMSService, TwilioFactoryService, AZcommunicationService],
  exports: [TwilioFactoryService],
})
export class SMSModule {}

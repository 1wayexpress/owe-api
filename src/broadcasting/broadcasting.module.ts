import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { SMSModule } from './sms/sms.module';
@Module({
  imports: [ EmailModule, SMSModule],
  controllers: [],
  providers: [],
})
export class BroadcastingModule {}

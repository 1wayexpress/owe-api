import { Injectable } from '@nestjs/common';
import { AZcommunicationService } from './azure-com.service';
import { SMSTemplateConfig } from './entities/sms-template.entity';
import { TwilioFactoryService } from './twilio.service';

@Injectable()
export class SMSService {
  constructor(
    private twilioService: TwilioFactoryService,
    private azComService: AZcommunicationService,
  ) {}

  async sendSMSWithTwilio(config: SMSTemplateConfig) {
    return await this.twilioService.sendSMS(config);
  }
  async sendSMSWithAZComm(config: SMSTemplateConfig) {
    return await this.azComService.sendSMS(config);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { SMSTemplateConfig } from './entities/sms-template.entity';

@Injectable()
export class TwilioFactoryService {
  private client: Twilio;
  private senderPhone: string;

  constructor(configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.senderPhone = configService.get('TWILIO_SENDER_PHONE_NUMBER');

    this.client = new Twilio(accountSid, authToken);
  }

  async sendSMS(config: SMSTemplateConfig) {
    if (!this.senderPhone) {
      throw new Error('Invalid Send Phone Number Config');
    }
    try {
      const msg = await this.client.messages.create({
        body: config.message,
        from: this.senderPhone,
        to: config.phone,
      });
      return { data: msg };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }
}

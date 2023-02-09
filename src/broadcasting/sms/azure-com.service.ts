import { SmsClient } from '@azure/communication-sms';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SMSTemplateConfig } from './entities/sms-template.entity';

@Injectable()
export class AZcommunicationService {
  private client: SmsClient;
  private senderPhone: string;

  constructor(configService: ConfigService) {
    const connString = configService.get<string>(
      'AZCOMM_SERVICES_CONNECTION_STRING',
    );
    this.senderPhone = configService.get('AZCOMM_SENDER_PHONE_NUMBER');
    this.client = new SmsClient(connString);
  }

  async sendSMS(config: SMSTemplateConfig) {
    try {
      const sendResults = await this.client.send({
        from: this.senderPhone,
        to: [
          config.phone.startsWith('+1') ? config.phone : '+1' + config.phone,
        ],
        message: config.message,
      });

      return sendResults;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

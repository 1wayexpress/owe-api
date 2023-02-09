import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailTemplateConfig } from './entities/email-template.entity';
import * as SendGrid from '@sendgrid/mail';

export const EMAIL_TEMPLATE = {
  "SHIPMENT_CREATED": "d-12967e06fe3545c5956365331f6547a0",
  "SHIPMENT_DRIVER_APPROVAL": "d-640f4dc6b2f04c018f930312066f6bf6",
  "SHIPMENT_COMPLETED": "d-51e1391e60064a99a6ce880ee86059f8"
};
@Injectable()
export class SendGridFactoryService {
  templateConfigs = EMAIL_TEMPLATE;

  public constructor(private configSvc: ConfigService) {
    SendGrid.setApiKey(this.configSvc.get<string>('SENDGRID_API_KEY'));
  }
  
  async sendTemplateEmailWithParams(config: EmailTemplateConfig) {
    const emailFrom = this.configSvc.get<string>('SENDGRID_SENDER');

    if (!this.templateConfigs[config.templateId]) {
      throw new Error(`${config.templateId} : Email Template Not supported`);
    }

    const msg = {
      to: config.email,
      from: emailFrom,
      subject: config.subject,
      reply_to: config.replyTo,
      templateId: this.templateConfigs[config.templateId],
      dynamicTemplateData: config.templateData
    };

    try {
      await SendGrid.send(msg);
      console.log('[sendTemplateEmailWithParams] Email sent');
      return 'Email Sent';
    } catch (error) {
      console.error('[sendTemplateEmailWithParams] ', error);
      return false;// "Email sending failed";
    }
  }
}

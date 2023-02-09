import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../authn/auth.guard';
import { EmailTemplateConfig } from './entities/email-template.entity';
import { SendGridFactoryService } from './sendgrid.service';

@Controller('emailService')
@UseGuards(new AuthGuard())
export class EmailController {
  constructor(
    private readonly sendGridService: SendGridFactoryService,
  ) {}

  @Post('sendEmail')
  async sendEmail(@Body() payload: EmailTemplateConfig) {
    try {
      const res = await this.sendGridService.sendTemplateEmailWithParams({
        email: payload.email,
        subject: payload.subject,
        templateId: payload.templateId,
        templateData: payload.templateData
      }
      );
      return { data: typeof res === 'boolean' ? res.toString() : res };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

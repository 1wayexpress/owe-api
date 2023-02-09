import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../authn/auth.guard';
import { SMSTemplateConfig } from './entities/sms-template.entity';
import { SMSService } from './sms.service';

@Controller('smsService')
@UseGuards(new AuthGuard())
export class SMSController {
  constructor(
    private readonly sendGridService: SMSService,
  ) {}

  @Post('sendSMS')
  async sendSMS(@Body() payload: SMSTemplateConfig) {
    try {
      const res = await this.sendGridService.sendSMSWithAZComm({
        phone: payload.phone,
        message: payload.message,
      }
      );
      return {data: res};
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

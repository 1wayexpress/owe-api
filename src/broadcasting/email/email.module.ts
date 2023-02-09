import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Email } from './entities/email.entity';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { SendGridFactoryService } from './sendgrid.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../../authn/auth.module';

@Module({
  imports: [
    ConfigModule,
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('SENDGRID_API_KEY'),
      }),
    }),
    AuthModule
  ],
  controllers: [EmailController],
  providers: [EmailService, SendGridFactoryService],
  exports: [SendGridFactoryService],
})
export class EmailModule {}

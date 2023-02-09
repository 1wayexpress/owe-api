/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthGuard } from './authn/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const whitelist = (configService.get('ORIGINS') as string).split(',');
  app.enableCors({
    origin: async (origin, callback) => {
      const severUrl = await app.getUrl();
      console.log('Server url: ' + severUrl + ", origin: " + origin);
      if (whitelist.indexOf(origin) !== -1 || whitelist.includes(severUrl)) {
        callback(null, true);
        return;
      }

      callback(
        new Error('LMS API: Not allowed by CORS: ' + JSON.stringify({ severUrl, origin })),
      );
    },
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

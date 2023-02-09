import { Test, TestingModule } from '@nestjs/testing';
import { SMSController } from './sms.controller';
import { SMSService } from './sms.service';

describe('SMSController', () => {
  let controller: SMSController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SMSController],
      providers: [SMSService],
    }).compile();

    controller = module.get<SMSController>(SMSController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

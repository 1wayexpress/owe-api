import { Test, TestingModule } from '@nestjs/testing';
import { IdmController } from './idm.controller';
import { IdmService } from './idm.service';

describe('IdmController', () => {
  let controller: IdmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdmController],
      providers: [IdmService],
    }).compile();

    controller = module.get<IdmController>(IdmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IdmService } from './idm.service';

describe('IdmService', () => {
  let service: IdmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdmService],
    }).compile();

    service = module.get<IdmService>(IdmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

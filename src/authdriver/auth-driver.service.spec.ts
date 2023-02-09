import { Test, TestingModule } from '@nestjs/testing';
import { AuthDriverService } from './auth-driver.service';

describe('AuthDriverService', () => {
  let service: AuthDriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthDriverService],
    }).compile();

    service = module.get<AuthDriverService>(AuthDriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

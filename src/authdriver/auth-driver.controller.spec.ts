import { Test, TestingModule } from '@nestjs/testing';
import { AuthDriverController } from './auth-driver.controller';
import { AuthDriverService } from './auth-driver.service';

describe('AuthDriverService', () => {
  let controller: AuthDriverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthDriverController],
      providers: [AuthDriverService],
    }).compile();

    controller = module.get<AuthDriverController>(AuthDriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

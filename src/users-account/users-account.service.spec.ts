import { Test, TestingModule } from '@nestjs/testing';
import { UsersAccountService } from './users-account.service';

describe('UsersAccountService', () => {
  let service: UsersAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAccountService],
    }).compile();

    service = module.get<UsersAccountService>(UsersAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

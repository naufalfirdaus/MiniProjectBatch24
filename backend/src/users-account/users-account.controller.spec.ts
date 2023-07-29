import { Test, TestingModule } from '@nestjs/testing';
import { UsersAccountController } from './users-account.controller';

describe('UsersAccountController', () => {
  let controller: UsersAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAccountController],
    }).compile();

    controller = module.get<UsersAccountController>(UsersAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

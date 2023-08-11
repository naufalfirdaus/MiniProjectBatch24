import { Test, TestingModule } from '@nestjs/testing';
import { TalentApplyController } from './talent-apply.controller';

describe('TalentApplyController', () => {
  let controller: TalentApplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentApplyController],
    }).compile();

    controller = module.get<TalentApplyController>(TalentApplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

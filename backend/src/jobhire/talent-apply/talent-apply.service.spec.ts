import { Test, TestingModule } from '@nestjs/testing';
import { TalentApplyService } from './talent-apply.service';

describe('TalentApplyService', () => {
  let service: TalentApplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentApplyService],
    }).compile();

    service = module.get<TalentApplyService>(TalentApplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

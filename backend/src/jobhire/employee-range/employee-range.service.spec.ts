import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRangeService } from './employee-range.service';

describe('EmployeeRangeService', () => {
  let service: EmployeeRangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRangeService],
    }).compile();

    service = module.get<EmployeeRangeService>(EmployeeRangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

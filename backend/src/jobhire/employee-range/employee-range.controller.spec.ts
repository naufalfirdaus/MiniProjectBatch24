import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRangeController } from './employee-range.controller';

describe('EmployeeRangeController', () => {
  let controller: EmployeeRangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeRangeController],
    }).compile();

    controller = module.get<EmployeeRangeController>(EmployeeRangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

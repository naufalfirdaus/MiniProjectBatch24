import { Test, TestingModule } from '@nestjs/testing';
import { JobhireController } from './jobhire.controller';

describe('JobhireController', () => {
  let controller: JobhireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobhireController],
    }).compile();

    controller = module.get<JobhireController>(JobhireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

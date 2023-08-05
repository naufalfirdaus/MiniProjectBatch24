import { Test, TestingModule } from '@nestjs/testing';
import { JobhireService } from './jobhire.service';

describe('JobhireService', () => {
  let service: JobhireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobhireService],
    }).compile();

    service = module.get<JobhireService>(JobhireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

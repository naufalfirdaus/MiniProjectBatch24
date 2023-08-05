import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobCategoryDto } from './dto/create-jobcategory.dto';
import { UpdateJobCategoryDto } from './dto/update-jobcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCategory } from 'output/entities/JobCategory';
import { Repository } from 'typeorm';

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private jobCategoryRepository: Repository<JobCategory>,
  ) {}

  async FindAll() {
    return await this.jobCategoryRepository.find();
  }

  async FindOne(jocaId: number) {
    const job_category = await this.jobCategoryRepository.findOneBy({ jocaId });

    if (!job_category)
      throw new NotFoundException(
        `job category with id ${jocaId} is not exist`,
      );

    return job_category;
  }

  async Create(createJobCategoryDto: CreateJobCategoryDto) {
    return await this.jobCategoryRepository.save({
      jocaName: createJobCategoryDto.name,
    });
  }

  async Update(jocaId: number, updateJobCategoryDto: UpdateJobCategoryDto) {
    const updated = await this.jobCategoryRepository.update(jocaId, {
      jocaName: updateJobCategoryDto.name,
      jocaModifiedDate: new Date(),
    });

    if (updated.affected === 0)
      throw new NotFoundException('nothing to update');

    return updated;
  }

  async Delete(jocaId: number) {
    const deleted = await this.jobCategoryRepository.delete(jocaId);

    if (deleted.affected === 0)
      throw new NotFoundException('nothing to delete');

    return deleted;
  }
}

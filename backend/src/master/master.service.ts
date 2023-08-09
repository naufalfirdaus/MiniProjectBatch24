import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'output/entities/Address';
import { Education } from 'output/entities/Education';
import { Industry } from 'output/entities/Industry';
import { JobType } from 'output/entities/JobType';
import { Repository } from 'typeorm';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(JobType)
    private readonly jobTypeRepo: Repository<JobType>,
    @InjectRepository(Industry)
    private readonly industryRepo: Repository<Industry>,
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>,
  ) {}

  async FindAllAddress() {
    return this.addressRepo.find({
      select: {
        addrId: true,
        addrLine1: true,
        addrLine2: true,
        addrCity: {
          cityName: true,
          cityProv: {
            provName: true,
            provCountryCode: {
              countryName: true,
            },
          },
        },
      },
      relations: { addrCity: { cityProv: { provCountryCode: true } } },
    });
  }

  async FindAllJobType() {
    return this.jobTypeRepo.find();
  }

  async FindAllIndustry() {
    return this.industryRepo.find();
  }

  async FindAllEducation() {
    return this.educationRepo.find();
  }
}

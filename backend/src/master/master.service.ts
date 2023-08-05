import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'output/entities/Address';
import { JobType } from 'output/entities/JobType';
import { Repository } from 'typeorm';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(JobType)
    private readonly jobTypeRepo: Repository<JobType>,
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
}

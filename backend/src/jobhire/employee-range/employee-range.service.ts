import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRange } from 'output/entities/EmployeeRange';
import { Repository } from 'typeorm';
import { CreateEmraDto } from './dto/create-emra.dto';

@Injectable()
export class EmployeeRangeService {
  constructor(
    @InjectRepository(EmployeeRange)
    private employeeRangeRepository: Repository<EmployeeRange>,
  ) {}

  async Create(createEmraDto: CreateEmraDto) {
    return await this.employeeRangeRepository.save({
      emraRangeMin: createEmraDto.min,
      emraRangeMax: createEmraDto.max,
    });
  }

  async FindAll() {
    return await this.employeeRangeRepository.find();
  }

  async FindOne(emraId: number) {
    return await this.employeeRangeRepository.findOneBy({ emraId });
  }
}

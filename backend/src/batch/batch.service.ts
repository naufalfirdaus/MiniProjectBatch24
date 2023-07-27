import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Batch) private serviceBatch: Repository<Batch>,
  ) {}

  public async findAll() {
    return await this.serviceBatch.find({});
  }
}

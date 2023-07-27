import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { BatchController } from 'src/batch/batch.controller';
import { BatchService } from 'src/batch/batch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Batch])],
  providers: [BatchService],
  controllers: [BatchController],
})
export class GlobalModule {}

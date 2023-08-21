import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { ProgramsController } from './programs/programs.controller';
import { ProgramsService } from './programs/programs.service';
import { CartItems } from 'output/entities/CartItems';
import { Users } from 'output/entities/Users';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersMedia } from 'output/entities/UsersMedia';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMulter } from 'src/multer/multer';
import { Employee } from 'output/entities/Employee';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItems,
      Users,
      UsersEducation,
      UsersMedia,
      ProgramEntity,
      ProgramApply,
      ProgramApplyProgress,
      Employee,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
  ],
  controllers: [CartController, ProgramsController],
  providers: [CartService, ProgramsService],
})
export class SalesModule {}

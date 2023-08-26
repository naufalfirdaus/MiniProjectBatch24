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
import { Fintech } from 'output/entities/Fintech';
import { UsersAccount } from 'output/entities/UsersAccount';
import { FintechController } from './fintech/fintech.controller';
import { SalesOrderHeader } from 'output/entities/SalesOrderHeader';
import { TransactionPayment } from 'output/entities/TransactionPayment';
import { Status } from 'output/entities/Status';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { MailService } from './mail/mail.service';
import { FintechService } from './fintech/fintech.service';

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
      Fintech,
      UsersAccount,
      SalesOrderHeader,
      TransactionPayment,
      Status,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
  ],
  controllers: [
    ProgramsController,
    CartController,
    FintechController,
    OrderController,
  ],
  providers: [
    ProgramsService,
    CartService,
    UsersAccount,
    OrderService,
    MailService,
    FintechService,
  ],
})
export class SalesModule {}

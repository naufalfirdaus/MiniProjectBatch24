import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

import { Users } from 'output/entities/Users';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersPhones } from 'output/entities/UsersPhones';
import { PhoneNumberType } from 'output/entities/PhoneNumberType';
import { UsersRoles } from 'output/entities/UsersRoles';
import { Roles } from 'output/entities/Roles';
import { UsersAddress } from 'output/entities/UsersAddress';
import { Address } from 'output/entities/Address';
import { AddressType } from 'output/entities/AddressType';
import { City } from 'output/entities/City';

import { LocalGuard } from 'src/auth/local/local.guard';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UploadMulter } from 'src/multer/multer';
import { UsersExperiences } from 'output/entities/UsersExperiences';
import { Bank } from 'output/entities/Bank';
import { Fintech } from 'output/entities/Fintech';
import { UsersAccount } from 'output/entities/UsersAccount';
import { TransactionPayment } from 'output/entities/TransactionPayment';
import { BankController } from 'src/payment/bank/bank.controller';
import { FintechController } from 'src/payment/fintech/fintech.controller';
import { BankService } from 'src/payment/bank/bank.service';
import { FintechService } from 'src/payment/fintech/fintech.service';
import { TransactionsService } from 'src/payment/transactions/transactions.service';
import { UsersAccountService } from 'src/payment/users-account/users-account.service';
import { UsersAccountController } from 'src/payment/users-account/users-account.controller';
import { TransactionsController } from 'src/payment/transactions/transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      BusinessEntity,
      UsersEducation,
      UsersEmail,
      UsersPhones,
      PhoneNumberType,
      UsersRoles,
      UsersAddress,
      Roles,
      Address,
      AddressType,
      City,
      Bank,
      Fintech,
      UsersAccount,
      TransactionPayment,
      UsersEducation,
      UsersExperiences,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({ secret: 'miniproject' }),
  ],
  providers: [
    BankService,
    UsersAccountService,
    FintechService,
    TransactionsService,
    UsersService,
    LocalGuard,
    JwtGuard,
  ],
  controllers: [
    BankController,
    UsersAccountController,
    FintechController,
    TransactionsController,
    UsersController,
  ],
  exports: [UsersService, UsersAccountService],
})
export class GlobalModule {}

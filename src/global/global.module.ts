import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'output/entities/Bank';
import { BankService } from 'src/bank/bank.service';
import { BankController } from 'src/bank/bank.controller';
import { UsersAccount } from 'output/entities/UsersAccount';
import { UsersAccountService } from 'src/users-account/users-account.service';
import { UsersAccountController } from 'src/users-account/users-account.controller';
import { Fintech } from 'output/entities/Fintech';
import { FintechService } from 'src/fintech/fintech.service';
import { FintechController } from 'src/fintech/fintech.controller';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { Users } from 'output/entities/Users';
import { UsersAddress } from 'output/entities/UsersAddress';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersExperiences } from 'output/entities/UsersExperiences';
import { UsersSkill } from 'output/entities/UsersSkill';
import { UsersLicense } from 'output/entities/UsersLicense';
import { UsersMedia } from 'output/entities/UsersMedia';
import { UsersPhones } from 'output/entities/UsersPhones';
import { PhoneNumberType } from 'output/entities/PhoneNumberType';
import { UsersRoles } from 'output/entities/UsersRoles';
import { Roles } from 'output/entities/Roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bank,
      UsersAccount,
      Fintech,
      BusinessEntity,
      Users,
      UsersAddress,
      UsersEducation,
      UsersEmail,
      UsersExperiences,
      UsersSkill,
      UsersLicense,
      UsersMedia,
      UsersPhones,
      UsersPhones,
      PhoneNumberType,
      UsersRoles,
      Roles,
    ]),
  ],
  providers: [BankService, UsersAccountService, FintechService],
  controllers: [BankController, UsersAccountController, FintechController],
})
export class GlobalModule {}

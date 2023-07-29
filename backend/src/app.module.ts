import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { BankService } from './bank/bank.service';
import { BankController } from './bank/bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UsersAccountService } from './users-account/users-account.service';
import { UsersAccountController } from './users-account/users-account.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alam',
      database: 'revampdb',
      entities: ['dist/output/entitites/*.js'],
      autoLoadEntities: true,
    }),
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

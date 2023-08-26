/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './sales/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SalesModule, UsersModule, MailModule],
})
export class AppModule {}

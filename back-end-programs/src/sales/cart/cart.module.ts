/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from 'output/entities/CartItems';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { Users } from 'output/entities/Users';
import { SpecialOffer } from 'output/entities/SpecialOffer';
import { SpecialOfferPrograms } from 'output/entities/SpecialOfferPrograms';
import { SalesOrderDetail } from 'output/entities/SalesOrderDetail';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItems,
      ProgramEntity,
      Users,
      SpecialOfferPrograms,
      SpecialOffer,
      SalesOrderDetail,
    ]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

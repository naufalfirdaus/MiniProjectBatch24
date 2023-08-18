/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
export class OrderDto {
  @IsInt()
  @Type(() => Number)
  user: number;
  trpaCodeNumber: string;
  statusModule: string;
  soheId: number;
  accountNumber: string;
}

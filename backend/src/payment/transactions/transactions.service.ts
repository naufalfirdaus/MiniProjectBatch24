import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TransactionPayment } from 'output/entities/TransactionPayment';
import { UsersAccount } from 'output/entities/UsersAccount';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionPayment) private serviceTrpa: Repository<TransactionPayment>,
        @InjectRepository(UsersAccount) private serviceUsac: Repository<UsersAccount>
    ) { }

    async verifyTransaction(accountNumber: string, fintech: any) {
        const accountUser = await this.serviceUsac.findOne({ where: { usacAccountNumber: accountNumber } });

        const isBalanceEnough = accountUser.usacSaldo > fintech.price;

        if (!isBalanceEnough) {
            throw new ForbiddenException('Your balance is not enough for buy this item');
        } else {
            return { success: isBalanceEnough }
        }
    }

    async getAllTransactions(search: string, options: PaginationDto) {
        const skippedItems = (options.page - 1) * options.limit;
        const totalCount = await this.serviceTrpa.count();

        if (search) {
            const transactions = await this.serviceTrpa.find({
                relations: { users: true },
                take: options.limit,
                skip: skippedItems,
                where: {
                    trpaSourceId: Like(`%${search}%`),
                    trpaTargetId: Like(`%${search}%`),
                },
            })

            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                data: transactions
            }

        } else {
            const transactions = await this.serviceTrpa.find({
                relations: { users: true },
                take: options.limit,
                skip: skippedItems,
            })

            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                data: transactions
            }

        }



    }

}

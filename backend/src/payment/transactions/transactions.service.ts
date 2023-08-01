import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, QueryRunner, Repository } from 'typeorm';
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
        const { accountUser } = await this.verifyAccount(accountNumber)

        const isBalanceEnough = accountUser.usacSaldo > fintech.price;

        if (!isBalanceEnough) {
            throw new ForbiddenException('Your balance is not enough for buy this item');
        } else {
            return { success: isBalanceEnough }
        }
    }

    async transfer(payload: any) {
        const sourceCode = payload.sourceCode;
        const targetCode = payload.targetCode;
        const amount = payload.amount;
        const userId = payload.userId;

        // VerifyAccount
        await this.verifyAccount(sourceCode);
        await this.verifyAccount(targetCode);

        let createdTransfer: TransactionPayment;

        const queryRunner = this.serviceTrpa.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            await this.updateBalances(queryRunner, sourceCode, targetCode, amount, userId);

            createdTransfer = await this.createTransactionPayment(
                queryRunner,
                sourceCode,
                targetCode,
                amount,
                0,
                userId,
                'TR',
                'Transfer'
            );

            await this.createTransactionPayment(
                queryRunner,
                targetCode,
                sourceCode,
                0,
                amount,
                userId,
                'TR',
                'Received Transfer'
            );

            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return error.response;
        } finally {
            await queryRunner.release();
        }
        return createdTransfer;
    }

    async topUp(payload: any) {
        const sourceCode = payload.sourceCode;
        const targetCode = payload.targetCode;
        const amount = payload.amount;
        const userId = payload.userId;

        // VerifyAccount
        await this.verifyAccount(sourceCode);
        await this.verifyAccount(targetCode);

        let createdTopupCredit: TransactionPayment;

        const queryRunner = this.serviceTrpa.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            await this.updateBalances(queryRunner, sourceCode, targetCode, amount, userId);

            createdTopupCredit = await this.createTransactionPayment(
                queryRunner,
                sourceCode,
                targetCode,
                amount,
                0,
                userId,
                'TP',
                'Top-up'
            );

            await this.createTransactionPayment(
                queryRunner,
                targetCode,
                sourceCode,
                0,
                amount,
                userId,
                'TP',
                'Received Top-up'
            );

            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return error.response;
        } finally {
            await queryRunner.release();
        }
        return createdTopupCredit;
    }

    async paymentTransactions(accountNumber: string, fintech: any) {
        const sourceCode = accountNumber;
        const targetCode = '13198989898';
        const amount = fintech.amount;
        const userId = fintech.userId;

        let createdOrderPayment: TransactionPayment;

        const queryRunner = this.serviceTrpa.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();


        try {

            await this.updateBalances(queryRunner, sourceCode, targetCode, amount, userId);

            createdOrderPayment = await this.createTransactionPayment(
                queryRunner,
                sourceCode,
                targetCode,
                amount,
                0,
                userId,
                'OD',
                'Order'
            );

            await this.createTransactionPayment(
                queryRunner,
                targetCode,
                sourceCode,
                0,
                amount,
                userId,
                'OD',
                'Received Order'
            );

            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return error.response;
        } finally {
            await queryRunner.release();
        }
        return createdOrderPayment;
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


    public async createTransactionPayment(
        queryRunner: QueryRunner,
        sourceCode: string,
        targetCode: string,
        amountCredit: number,
        amountDebit: number,
        userId: number,
        type: string,
        note: string
    ): Promise<TransactionPayment> {
        const newTopup: any = new TransactionPayment();
        newTopup.trpaOrderNumber = null,
            newTopup.trpaCredit = amountCredit,
            newTopup.trpaDebit = amountDebit,
            newTopup.trpaNote = note,
            newTopup.trpaSourceId = sourceCode,
            newTopup.trpaTargetId = targetCode,
            newTopup.trpaType = type,
            newTopup.trpaUserEntityId = userId

        return await queryRunner.manager.save(newTopup);
    }

    // Private function
    private async updateBalances(
        queryRunner: QueryRunner,
        sourceCode: string,
        targetCode: string,
        amount: number,
        userId: number,
    ): Promise<{ sourceBank: UsersAccount; targetFintech: UsersAccount }> {
        const targetFintech: any = await this.serviceUsac.findOne({
            where: { usacAccountNumber: targetCode, usacUserEntityId: userId },
        });

        if (!targetFintech) {
            throw new NotFoundException(
                `Target account with account number ${targetCode} and userId ${userId} not found.`,
            );
        }

        const targetBalance: number = targetFintech.usacSaldo;

        const sourceBank: any = await this.serviceUsac.findOne({
            where: { usacAccountNumber: sourceCode, usacUserEntityId: userId },
        });

        if (!sourceBank) {
            throw new NotFoundException(
                `Source account with account number ${sourceCode} and userId ${userId} not found.`,
            );
        }

        if (sourceBank.usacSaldo < amount) {
            throw new ForbiddenException('Source account balance is not enough');
        }

        const sourceBalance: number = sourceBank.usacSaldo

        sourceBank.usacSaldo = Number(sourceBalance) - amount;
        targetFintech.usacSaldo = Number(targetBalance) + amount;

        await queryRunner.manager.save(sourceBank);
        await queryRunner.manager.save(targetFintech);

        return { sourceBank, targetFintech };
    }

    private async verifyAccount(accountNumber: string): Promise<{ accountUser: UsersAccount }> {
        const accountUser = await this.serviceUsac.findOne({ where: { usacAccountNumber: accountNumber } });

        if (accountUser.usacStatus !== 'active') {
            throw new ForbiddenException(`Your users account with number ${accountUser.usacAccountNumber} is invalid`)
        }

        return { accountUser };
    }
}

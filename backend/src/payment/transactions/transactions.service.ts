import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, QueryRunner, Repository } from 'typeorm';
import { TransactionPayment } from 'output/entities/TransactionPayment';
import { UsersAccount } from 'output/entities/UsersAccount';
import { PaginationDto } from './pagination.dto';
import { Users } from 'output/entities/Users';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionPayment) private serviceTrpa: Repository<TransactionPayment>,
        @InjectRepository(UsersAccount) private serviceUsac: Repository<UsersAccount>,
        @InjectRepository(Users) private serviceUser: Repository<Users>
    ) { }

    async verifyTransaction(accountNumber: string, req: any, fintech: any) {
        const { user } = req;
        const { accountUser } = await this.verifyAccount(accountNumber, user)

        const isBalanceEnough = accountUser.usacSaldo > fintech.price;

        if (!isBalanceEnough) {
            throw new ForbiddenException('Your balance is not enough for buy this item');
        } else {
            return { success: isBalanceEnough }
        }
    }

    async topUpAndTransfer(payload: any, req: any) {
        const sourceCode = payload.sourceCode;
        const targetCode = payload.targetCode;
        const amount = payload.amount;
        const user = await this.serviceUser.findOne({
            where: { userEntityId: req.user.UserId }
        });
        let typeTransactions: string;

        if (amount < 10000) {
            throw new ForbiddenException('Minimal amount for Topup is 10000')
        }

        // VerifyAccount
        const sourceAccount = await this.verifyAccount(sourceCode, user);
        const targetAccount = await this.verifyAccount(targetCode, user);

        const queryRunner = this.serviceTrpa.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const orderId = await this.serviceTrpa.query('select order_id()');
        const parsedOrderId = orderId[0]?.order_id

        try {

            await this.updateBalances(queryRunner, sourceCode, targetCode, amount, req.user.UserId);

            if (sourceAccount.accountUser.usacType === 'bank' && targetAccount.accountUser.usacType === 'fintech') {
                typeTransactions = 'Topup'

                // Debit
                await this.createTransactionPayment(
                    queryRunner,
                    sourceCode,
                    targetCode,
                    amount,
                    0,
                    user,
                    'TP',
                    'Top-up',
                    parsedOrderId
                );

                // Credit
                await this.createTransactionPayment(
                    queryRunner,
                    targetCode,
                    sourceCode,
                    0,
                    amount,
                    user,
                    'TP',
                    'Received Top-up',
                    parsedOrderId
                );
            } else if ((sourceAccount.accountUser.usacType === 'fintech' && targetAccount.accountUser.usacType === 'fintech') || (sourceAccount.accountUser.usacType === 'bank' && targetAccount.accountUser.usacType === 'bank')) {
                typeTransactions = 'Transfer'

                // Debit
                await this.createTransactionPayment(
                    queryRunner,
                    sourceCode,
                    targetCode,
                    amount,
                    0,
                    user,
                    'TR',
                    'Transfer',
                    parsedOrderId
                );

                // Credit
                await this.createTransactionPayment(
                    queryRunner,
                    targetCode,
                    sourceCode,
                    0,
                    amount,
                    user,
                    'TR',
                    'Received Transfer',
                    parsedOrderId
                );
            }
            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return error.response;
        } finally {
            await queryRunner.release();
        }
        return {
            message: `${typeTransactions} Success`
        };
    }

    async paymentTransactions(accountNumber: string, fintech: any, req: any) {
        const sourceCode = accountNumber;
        const targetCode = '13198989898';
        const amount = fintech.amount;
        const user = await this.serviceUser.findOne({
            where: { userEntityId: req.user.UserId }
        });

        const queryRunner = this.serviceTrpa.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const orderId = await this.serviceTrpa.query('select order_id');
        const parsedOrderId = orderId[0]?.order_id

        try {

            await this.updateBalances(queryRunner, sourceCode, targetCode, amount, req.user.UserId);

            // Debit
            await this.createTransactionPayment(
                queryRunner,
                sourceCode,
                targetCode,
                amount,
                0,
                user,
                'OD',
                'Order',
                parsedOrderId
            );

            // Credit
            await this.createTransactionPayment(
                queryRunner,
                targetCode,
                sourceCode,
                0,
                amount,
                user,
                'OD',
                'Received Order',
                parsedOrderId
            );

            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return error.response;
        } finally {
            await queryRunner.release();
        }
        return {
            message: "Payment order success"
        };
    }

    async getAllTransactions(search: string, paymentType: string, req: any, options: PaginationDto) {
        const skippedItems = (options.page - 1) * options.limit;
        let totalPages: number;

        if (search && paymentType) {
            const totalCount = await this.serviceTrpa.count({
                where: [{
                    trpaSourceId: Like(`%${search}%`),
                    trpaType: paymentType,
                    users: { userEntityId: req.user.UserId }
                }, {
                    trpaTargetId: Like(`%${search}%`),
                    trpaType: paymentType,
                    users: { userEntityId: req.user.UserId }
                }],
            });
            const transactions = await this.serviceTrpa.find({
                relations: ['users'],
                take: options.limit,
                skip: skippedItems,
                where: [{
                    trpaSourceId: Like(`%${search}%`),
                    trpaType: paymentType,
                    users: { userEntityId: req.user.UserId }
                }, {
                    trpaTargetId: Like(`%${search}%`),
                    trpaType: paymentType,
                    users: { userEntityId: req.user.UserId }
                }],
                order: { trpaId: 'DESC' }
            })

            totalPages = Math.ceil(totalCount / options.limit);

            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                totalPages,
                data: transactions
            }

        } else if (search) {

            const totalCount = await this.serviceTrpa.count({
                where: [{
                    trpaSourceId: Like(`%${search}%`),
                    users: { userEntityId: req.user.UserId }
                }, {
                    trpaTargetId: Like(`%${search}%`),
                    users: { userEntityId: req.user.UserId }
                }],
            });

            const transactions = await this.serviceTrpa.find({
                relations: { users: true },
                take: options.limit,
                skip: skippedItems,
                where: [{
                    trpaSourceId: Like(`%${search}%`),
                    users: { userEntityId: req.user.UserId }
                }, {
                    trpaTargetId: Like(`%${search}%`),
                    users: { userEntityId: req.user.UserId }
                }],
                order: { trpaId: 'DESC' }
            })

            totalPages = Math.ceil(totalCount / options.limit);

            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                totalPages,
                data: transactions
            }

        } else if (paymentType) {
            const totalCount = await this.serviceTrpa.count({
                where: { trpaType: paymentType, users: { userEntityId: req.user.UserId } },
            });
            const transactions = await this.serviceTrpa.find({
                relations: { users: true },
                where: { trpaType: paymentType, users: { userEntityId: req.user.UserId } },
                take: options.limit,
                skip: skippedItems,
                order: { trpaId: 'DESC' }
            })

            totalPages = Math.ceil(totalCount / options.limit);

            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                totalPages,
                data: transactions
            }
        } else {
            const totalCount = await this.serviceTrpa.count({
                where: { users: { userEntityId: req.user.UserId } },
            });
            const transactions = await this.serviceTrpa.find({
                relations: { users: true },
                where: { users: { userEntityId: req.user.UserId } },
                take: options.limit,
                skip: skippedItems,
                order: { trpaId: 'DESC' }
            })

            totalPages = Math.ceil(totalCount / options.limit);

            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                totalPages,
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
        userId: any,
        type: string,
        note: string,
        orderId: string
    ): Promise<TransactionPayment> {
        const newTopup: any = new TransactionPayment();
        newTopup.trpaOrderNumber = null,
            newTopup.trpaCredit = amountCredit,
            newTopup.trpaDebit = amountDebit,
            newTopup.trpaNote = note,
            newTopup.trpaSourceId = sourceCode,
            newTopup.trpaTargetId = targetCode,
            newTopup.trpaType = type,
            newTopup.users = userId,
            newTopup.trpaOrderNumber = orderId

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

    private async verifyAccount(accountNumber: string, user: any): Promise<{ accountUser: UsersAccount }> {
        const accountUser = await this.serviceUsac.findOne({ where: { usacAccountNumber: accountNumber, usacUserEntityId: user.UserId } });

        if (!accountUser) {
            throw new NotFoundException(`Users Account with number ${accountNumber} is not found`)
        }

        if (accountUser.usacStatus !== 'active') {
            throw new ForbiddenException(`Your users account with number ${accountNumber} is invalid`)
        }

        return { accountUser };
    }
}

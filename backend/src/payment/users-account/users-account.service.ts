import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAccount } from 'output/entities/UsersAccount';
import { Like, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { TransactionPayment } from 'output/entities/TransactionPayment';
import { TransactionsService } from 'src/payment/transactions/transactions.service';

@Injectable()
export class UsersAccountService {
  constructor(
    @InjectRepository(UsersAccount)
    private serviceUsersAccount: Repository<UsersAccount>,
    private readonly serviceTrpa: TransactionsService,
  ) { }

  public async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<UsersAccount>> {
    const users_account = await this.serviceUsersAccount.createQueryBuilder(
      'users_account',
    );
    return paginate(users_account, options);
  }

  public async findOne(id: number) {
    try {
      return await this.serviceUsersAccount.findOne({
        where: { usacUserEntityId: id },
      });
    } catch (error) {
      return error.message;
    }
  }

  public async findOneByUserIdAndBankFintech(bankFintech: number, req: any) {
    try {
      return await this.serviceUsersAccount.find({
        where: {
          usacUserEntityId: req.user.UserId,
          usacBankEntityId: bankFintech
        }
      })
    } catch (error) {
      return error.message;
    }
  }

  public async Create(body: any): Promise<UsersAccount> {
    const queryRunner = this.serviceUsersAccount.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let users: any;

    try {
      await this.serviceTrpa.createTransactionPayment(
        queryRunner,
        '13198989898',
        body.usac_account_number,
        0,
        body.usac_saldo,
        body.user_id,
        'SD',
        'Saldo',
        null
      );

      const time = new Date().toISOString();
      users = await this.serviceUsersAccount.save({
        usacBankEntityId: body.bank_id,
        usacUserEntityId: body.user_id,
        usacAccountNumber: body.usac_account_number,
        usacSaldo: body.usac_saldo,
        usacType: body.usac_type,
        usacStartDate: time,
        usacEndDate: time,
        usacModifiedDate: time,
        usacStatus: body.usac_status,
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error.message;
    } finally {
      await queryRunner.release();
    }
    return users;
  }

  public async Edit(accNumber: string, body: any) {
    try {
      const time = new Date().toISOString();
      const findUser = await this.serviceUsersAccount.findOne({
        where: { usacAccountNumber: accNumber },
      });

      if (findUser) {
        const users = await this.serviceUsersAccount.update(
          { usacAccountNumber: accNumber },
          {
            usacSaldo: body.usac_saldo,
            usacType: body.usac_type,
            usacEndDate: time,
            usacModifiedDate: time,
            usacStatus: body.usac_status,
          },
        );
        return users;
      } else {
        const msg = 'User not found';
        return msg;
      }
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(accNumber: string) {
    try {
      const findUser = await this.serviceUsersAccount.findOne({
        where: { usacAccountNumber: accNumber },
      });
      if (findUser) {
        return await this.serviceUsersAccount.delete({
          usacAccountNumber: accNumber,
        });
      } else {
        const msg = 'User not found';
        return msg;
      }
    } catch (error) {
      return error.message;
    }
  }
}

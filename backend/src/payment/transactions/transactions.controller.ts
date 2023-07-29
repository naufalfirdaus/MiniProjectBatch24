import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('api/fintech')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) { }

    @Post('verify/accounts')
    async verifyTransaction(
        @Query('accountnumber') accountNumber: string,
        @Body() payload: any
    ) {
        return this.service.verifyTransaction(accountNumber, payload);
    }

    @Get('transaction/view')
    async viewTransactionData(
        @Query('accountId', new DefaultValuePipe(null)) accountId: string,
        @Query('pageno', new DefaultValuePipe(1), ParseIntPipe) pageNo: number,
        @Query('pagesize', new DefaultValuePipe(3), ParseIntPipe) pageSize: number,
    ) {
        return this.service.getAllTransactions(accountId, {
            page: pageNo,
            limit: pageSize
        })
    }

}

import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
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

    // Topup and transfer
    @Post('topup')
    async topUpFintech(@Body() payload: any) {
        if (!payload.sourceCode || !payload.targetCode || !payload.amount || !payload.userId) {
            throw new NotFoundException("Required data is blank")
        }
        return this.service.topUp(payload);
    }

    @Post('transfer')
    async transferBank(@Body() payload: any) {
        if (!payload.sourceCode || !payload.targetCode || !payload.amount || !payload.userId) {
            throw new NotFoundException("Required data is blank")
        }
        return this.service.transfer(payload);
    }

    // Payment order
    @Post('accounts')
    async paymentTransactions(
        @Query('accountNumber') accountNumber: string,
        @Body() fintech: any
    ) {
        return this.service.paymentTransactions(accountNumber, fintech);
    }

    @Get('transaction/view')
    async viewTransactionData(
        @Query('accountId', new DefaultValuePipe(null)) accountId: string,
        @Query('pageno', new DefaultValuePipe(1), ParseIntPipe) pageNo: number,
        @Query('pagesize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    ) {
        return this.service.getAllTransactions(accountId, {
            page: pageNo,
            limit: pageSize
        })
    }

}

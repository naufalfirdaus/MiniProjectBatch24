import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/fintech')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) { }

    @Post('verify/accounts')
    async verifyTransaction(
        @Query('accountnumber') accountNumber: string,
        @Req() req: any,
        @Body() payload: any,
    ) {
        return this.service.verifyTransaction(accountNumber, req, payload);
    }

    // Topup and transfer
    @UseGuards(AuthGuard('jwt'))
    @Post('topup')
    async topUpAndTransferFintech(@Body() payload: any, @Req() req: any) {
        if (!payload.sourceCode || !payload.targetCode || !payload.amount) {
            throw new NotFoundException("Required data is blank")
        }
        return this.service.topUpAndTransfer(payload, req);
    }

    // Payment order
    @UseGuards(AuthGuard('jwt'))
    @Post('accounts')
    async paymentTransactions(
        @Query('accountNumber') accountNumber: string,
        @Body() fintech: any,
        @Req() req: any
    ) {
        return this.service.paymentTransactions(accountNumber, fintech, req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('transaction/view')
    async viewTransactionData(
        @Query('accountid', new DefaultValuePipe(null)) accountId: string,
        @Query('pageno', new DefaultValuePipe(1), ParseIntPipe) pageNo: number,
        @Query('pagesize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
        @Req() req: any,
        @Body('paymentType') paymentType: string
    ) {
        return this.service.getAllTransactions(accountId, paymentType, req, {
            page: pageNo,
            limit: pageSize
        })
    }

}

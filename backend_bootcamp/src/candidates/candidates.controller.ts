import { Controller } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Get, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('api/bootcamp/candidate/filterby')
export class CandidatesController {
    constructor(private Service: CandidatesService ) {}

    @Get()
    public async getByDate(
        @Query('month', new DefaultValuePipe(null)) month:number, 
        @Query('year', new DefaultValuePipe(null)) year:number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page : number,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit : number ){
        return await this.Service.findByDate(month, year, {
            page : page, 
            limit : limit
        });
    }

    @Get("status")
    public async getByStatus(
        @Query('status') status:string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page : number,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit : number
    ){
        return await this.Service.findByStatus(status, {
            page: page,
            limit: limit
        })
    }
}

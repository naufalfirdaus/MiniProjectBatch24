import { Controller } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Get, DefaultValuePipe, ParseIntPipe, Put, Param, Body } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('api/bootcamp/candidate')
export class CandidatesController {
    constructor(private Service: CandidatesService ) {}

    @Get("filterby")
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

    @Get("filterby/status")
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

    @Put(':idusr/:identity')
    public async updateStatus(
        @Param('idusr') idusr: number,
        @Param('identity') identity: number,
        @Body() fields: any
    ){
        return await this.Service.updateStatus(idusr, identity, fields);
    } 

}

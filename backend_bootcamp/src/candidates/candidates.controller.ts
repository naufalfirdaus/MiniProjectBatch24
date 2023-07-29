import { Controller } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('api/bootcamp/candidate')
export class CandidatesController {
    constructor(private Service: CandidatesService ) {}

    @Get()
    public async getByDate(@Query('month') month:number, @Query('year') year:number ){
        return await this.Service.findByDate(month, year)
    }
}

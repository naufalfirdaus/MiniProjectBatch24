import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeRangeService } from './employee-range.service';
import { CreateEmraDto } from './dto/create-emra.dto';

@Controller('employee-range')
export class EmployeeRangeController {
  constructor(private Services: EmployeeRangeService) {}

  @Post()
  async Create(@Body() createEmraDto: CreateEmraDto) {
    return this.Services.Create(createEmraDto);
  }

  @Get()
  async FindAll() {
    return this.Services.FindAll();
  }
}

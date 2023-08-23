import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('hr/employee')
export class EmployeeController {
  constructor(private Services: EmployeeService) {}

  @Get()
  public async getAll() {
    return this.Services.findAll();
  }

  @Get('dept')
  public async getAllDepartmet() {
    return this.Services.findAllDepartment();
  }

  @Get('joro')
  public async getAllJobRole() {
    return this.Services.findAllJobRole();
  }

  @Get('search')
  public async search(@Query() options: PaginationDto) {
    const room = this.Services.searchBy(options);
    return room;
  }

  @Get('paging')
  public async getAllLimit(@Query() options: PaginationDto) {
    const room = this.Services.findAllLimit(options);
    return room;
  }

  @Get('salaryhistory/:id')
  public async getEmployeePayHistory(@Param('id') id: number) {
    return this.Services.findEmployeePayHistory(id);
  }

  @Get('depthistory/:id')
  public async getDepartmentHistory(@Param('id') id: number) {
    return this.Services.findDepartmentHistory(id);
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return this.Services.findOne(id);
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.Services.Insert(fields);
  }

  @Put('update/:id')
  public async Update(@Param('id') employeeId, @Body() updateData?: any) {
    return this.Services.update(employeeId, updateData);
  }

  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return this.Services.Delete(id);
  }
}

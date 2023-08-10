import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'output/entities/Department';
import { Employee } from 'output/entities/Employee';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { EmployeeController } from 'src/employee/employee.controller';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeePayHistory,
      EmployeeDepartmentHistory,
      Department,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class GlobalModule {}

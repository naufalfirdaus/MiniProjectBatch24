import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'output/entities/Department';
import { Employee } from 'output/entities/Employee';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { JobRole } from 'output/entities/JobRole';
import { EmployeeController } from 'src/employee/employee.controller';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeePayHistory,
      EmployeeDepartmentHistory,
      Department,
      JobRole,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class GlobalModule {}

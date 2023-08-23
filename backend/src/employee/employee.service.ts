import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'output/entities/Employee';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { Like, Repository } from 'typeorm';
import { EmployeeInterface } from './employee.interface';
import { JobRole } from 'output/entities/JobRole';
import { Department } from 'output/entities/Department';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private serviceEmp: Repository<Employee>,
    @InjectRepository(EmployeePayHistory)
    private serviceEmpPayHistory: Repository<EmployeePayHistory>,
    @InjectRepository(EmployeeDepartmentHistory)
    private serviceEmpDeptHistory: Repository<EmployeeDepartmentHistory>,
    @InjectRepository(JobRole) private serviceJoro: Repository<JobRole>,
    @InjectRepository(Department)
    private serviceDepartment: Repository<Department>,
  ) {}

  public async findAllDepartment() {
    return await this.serviceDepartment.find({});
  }

  public async findAllJobRole() {
    return await this.serviceJoro.find({});
  }

  public async findAll() {
    return await this.serviceEmp.find({
      relations: [
        'empEntity',
        'employeeClientContracts',
        'employeeClientContracts.eccoStatus',
        'employeeDepartmentHistories',
        'employeeDepartmentHistories.edhiDept',
        'employeePayHistories',
        'empJoro',
      ],
    });
  }

  public async searchBy(
    options: PaginationOptions,
  ): Promise<EmployeeInterface> {
    const skippedItems = (options.pageno - 1) * options.pagesize;
    let totalCount = await this.serviceEmp.count();
    if (options.name !== '' || options.status !== '') {
      if (options.name === '') {
        const employee = await this.serviceEmp.find({
          select: {
            employeeClientContracts: {
              eccoStatus: {
                status: true,
              },
            },
            empEntity: {
              userFirstName: true,
            },
          },
          relations: ['employeeClientContracts', 'empEntity'],
          take: options.pagesize,
          skip: skippedItems,
          where: {
            employeeClientContracts: {
              eccoStatus: {
                status: Like(`%${options.status}%`),
              },
            },
          },
        });
        totalCount = await this.serviceEmp.count({
          where: {
            employeeClientContracts: {
              eccoStatus: {
                status: Like(`%${options.status}%`),
              },
            },
          },
        });
        return {
          totalCount,
          pageno: options.pageno,
          pagesize: options.pagesize,
          data: employee,
        };
      }
      if (options.status === '') {
        const employee = await this.serviceEmp.find({
          select: {
            employeeClientContracts: {
              eccoStatus: {
                status: true,
              },
            },
            empEntity: {
              userFirstName: true,
            },
          },
          relations: ['empEntity', 'employeeClientContracts'],
          take: options.pagesize,
          skip: skippedItems,
          where: {
            empEntity: {
              userFirstName: Like(`%${options.name}%`),
            },
          },
        });
        totalCount = await this.serviceEmp.count({
          where: {
            empEntity: {
              userFirstName: Like(`%${options.name}%`),
            },
          },
        });
        return {
          totalCount,
          pageno: options.pageno,
          pagesize: options.pagesize,
          data: employee,
        };
      }
      const employee = await this.serviceEmp.find({
        select: {
          employeeClientContracts: {
            eccoStatus: {
              status: true,
            },
          },
          empEntity: {
            userFirstName: true,
          },
        },
        relations: ['empEntity', 'employeeClientContracts'],
        take: options.pagesize,
        skip: skippedItems,
        where: [
          {
            empEntity: {
              userFirstName: Like(`%${options.name}%`),
            },
            employeeClientContracts: {
              eccoStatus: {
                status: Like(`%${options.status}%`),
              },
            },
          },
        ],
      });
      totalCount = await this.serviceEmp.count({
        where: [
          {
            empEntity: {
              userFirstName: Like(`%${options.name}%`),
            },
            employeeClientContracts: {
              eccoStatus: {
                status: Like(`%${options.status}%`),
              },
            },
          },
        ],
      });
      return {
        totalCount,
        pageno: options.pageno,
        pagesize: options.pagesize,
        data: employee,
      };
    } else {
      const employee = await this.serviceEmp.find({
        take: options.pagesize,
        skip: skippedItems,
      });
      return {
        totalCount,
        pageno: options.pageno,
        pagesize: options.pagesize,
        data: employee,
      };
    }
  }

  public async findAllLimit(
    options: PaginationOptions,
  ): Promise<EmployeeInterface> {
    const skippedItems = (options.pageno - 1) * options.pagesize;
    const totalCount = await this.serviceEmp.count();
    const employee = await this.serviceEmp.find({
      relations: [
        'empEntity',
        'employeeClientContracts',
        'employeeClientContracts.eccoStatus',
        'employeeDepartmentHistories',
        'employeeDepartmentHistories.edhiDept',
        'employeePayHistories',
      ],
      take: options.pagesize,
      skip: skippedItems,
      order: {
        empEntityId: 'ASC',
      },
    });
    return {
      totalCount,
      pageno: options.pageno,
      pagesize: options.pagesize,
      data: employee,
    };
  }

  public async findEmployeePayHistory(id: number) {
    const employeepayhistory = await this.serviceEmpPayHistory.findOne({
      where: { ephiEntityId: id },
    });

    return employeepayhistory;
  }

  public async findDepartmentHistory(id: number) {
    const depthistory = await this.serviceEmpDeptHistory.findOne({
      where: { edhiId: id },
      relations: ['edhiDept'],
    });

    return depthistory;
  }

  public async findOne(id: number) {
    const employee = await this.serviceEmp.findOne({
      where: { empEntityId: id },
      relations: [
        'empEntity',
        'employeeClientContracts',
        'employeeClientContracts.eccoStatus',
        'employeeDepartmentHistories',
        'employeeDepartmentHistories.edhiDept',
        'employeePayHistories',
        'empJoro',
      ],
    });

    return employee;
  }

  public async Insert(fields: any) {
    try {
      //insert ke table employee
      const employee = await this.serviceEmp.save({
        empEntityId: fields.empEntityId,
        empEmpNumber: fields.empEmpNumber,
        empNationalId: fields.empNationalId,
        empBirthDate: fields.empBirthDate,
        empMaritalStatus: fields.empMaritalStatus,
        empGender: fields.empGender,
        empHireDate: fields.empHireDate,
        empSalariedFlag: fields.empSalariedFlag,
        empVacationHours: fields.empVacationHours,
        empSickleaveHours: fields.empSickleaveHours,
        empCurrentFlag: fields.empCurrentFlag,
        empModifiedDate: new Date(),
        empJoro: fields.empJoro,
        empType: fields.empType,
        empEmpEntityId: fields.empEmpEntityId,
      });

      //insert table employeepayhistory
      await this.serviceEmpPayHistory.save({
        ephiEntityId: employee.empEntityId,
        ephiRateChangeDate: fields.ephiRateChangeDate,
        ephiRateSalary: fields.ephiRateSalary,
        ephiPayFrequence: fields.ephiPayFrequence,
        ephiModifiedDate: new Date(),
      });

      //insert table departement History
      await this.serviceEmpDeptHistory.save({
        edhiId: fields.edhiId,
        edhiEntityId: employee.empEntityId,
        edhiStartDate: fields.edhiStartDate,
        edhiEndDate: fields.edhiEndDate,
        edhiModifiedDate: new Date(),
        edhiDept: fields.edhiDept,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    employeeId: number,
    updateData: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.serviceEmp.findOne({
      where: { empEntityId: employeeId },
      relations: ['employeeDepartmentHistories', 'employeePayHistories'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    if (updateData.employeeDepartmentHistories) {
      employee.employeeDepartmentHistories =
        updateData.employeeDepartmentHistories;
    }

    if (updateData.employeePayHistories) {
      employee.employeePayHistories = updateData.employeePayHistories;
    }

    return this.serviceEmp.save(employee);
  }

  public async Delete(id: number) {
    try {
      const employee = await this.serviceEmp.findOne({
        where: { empEntityId: id },
        relations: ['employeeDepartmentHistories', 'employeePayHistories'],
      });

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      const payHistories = employee.employeePayHistories;

      if (employee.employeeDepartmentHistories) {
        const historyEmployee = employee.employeeDepartmentHistories[0]; // Ambil elemen pertama dari array
        const { edhiEntityId } = historyEmployee;
        await this.serviceEmpDeptHistory.delete({ edhiEntityId });
      }

      if (payHistories && payHistories.length > 0) {
        for (const payHistory of payHistories) {
          const { ephiEntityId } = payHistory;
          await this.serviceEmpPayHistory.delete({ ephiEntityId });
        }
      }

      await this.serviceEmp.remove(employee);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

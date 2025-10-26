import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID #${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    await this.findOne(id);
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}

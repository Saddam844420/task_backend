import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { DepartmentModel } from './Model/department.model';
import { DepartmentDto } from './dto/department.dto';
import { Department } from 'generated/prisma';
import { CurrentUser } from 'src/auth/current-user.decorator';
@Resolver()
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => [DepartmentModel])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllDepartment(@CurrentUser() user: any) {
    return this.departmentService.getAllDepartment(user);
  }

  @Mutation(() => DepartmentModel)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createDepartment(
    @Args('department') data: DepartmentDto,
    @CurrentUser() user: any,
  ) {
    return this.departmentService.createDepartment(data, user);
  }
}

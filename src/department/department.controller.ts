import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService:DepartmentService){}


    @UseGuards(AuthGuard,RolesGuard)
    @Roles('ADMIN')
   async createDepartment(
    @Body() department:DepartmentDto,
    @Req() req: Request & { user?: any }
){
    const user = req.user;
    return this.departmentService.createDepartment(department,user)
    }


    async getAllDepartment(@Req() req: Request & { user?: any }){
        const user = req.user
        return this.departmentService.getAllDepartment(user)
    }
    }


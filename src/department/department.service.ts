import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DepartmentDto } from './dto/department.dto';
@Injectable()
export class DepartmentService {
    constructor(private readonly prismaService :PrismaService){}

    async createDepartment(department: DepartmentDto, user: any){
        return await this.prismaService.department.create({
            data:{
                name: department.department,
                companyId: user.companyId
            }
        })
    }

    async getAllDepartment(user:any){
        return await this.prismaService.department.findMany({
            where:{
                companyId :user.companyId
            }
        })
    }


}

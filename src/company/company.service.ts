import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class CompanyService {
    constructor(private readonly prisma:PrismaService){}


    async getCompanies(){
        return await this.prisma.company.findMany({
            include: {
                taxDetail: true,
            },
        });
    }

    async createCompany(companyData: CreateCompanyDto){
        const {name, address, email, phone, taxDetails} = companyData;
        const data: any = {
            name,
            address,
            email,
            phone,
        };

        if (taxDetails && taxDetails.length) {
            // map string[] to create objects for the nested relation
            data.taxDetail = {
                createMany: taxDetails.map(t => (
                    { 
                    taxType: t.taxType,
                    taxNumber: t.taxNumber
                    }
                ))
            };
        }

        return this.prisma.company.create({ data });
    }
}

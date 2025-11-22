import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { ValidationContext } from 'graphql';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class CompanyService {
    constructor(private readonly prisma:PrismaService){}


    async getCompanies(){
        return await this.prisma.company.findMany({
            include: {
                taxDetail: true,
                user:true,
                department:true
            },
        });
    }

   async createCompany(companyData: CreateCompanyDto) {
  const { name, address, email, phone, taxDetails, adminName } = companyData;

  try {
    // Step 1 — Create Company
    const company = await this.prisma.company.create({
      data: { name, address, email, phone },
    });

    // Step 2 — Create Tax Details
    await this.prisma.taxDetail.createMany({
      data: taxDetails.map((t) => ({
        compnayId: company.id,
        taxType: t.taxType,
        taxNumber: t.taxNumber,
      })),
    });

    // Step 3 — Generate Admin user
    const saltOrRounds = await bcrypt.genSalt();
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, saltOrRounds);

    const user = await this.prisma.user.create({
      data: {
        name: adminName,
        email,
        companyId: company.id,
        isMailVerified: false,
        role: 'ADMIN',
        password: hashedPassword,
      },
    });

    // FINAL SUCCESS RETURN FORMAT
    return {
      status: true,
      message: 'Company created successfully',
      data: {
        company,
        adminUser: user,
        temporaryPassword: rawPassword,
      },
    };
  } catch (e) {
    // Prisma duplicate error
    if (e.code === 'P2002') {
      throw new BadRequestException({
        status: false,
        message: `Duplicate value for field: ${e.meta.target}`,
      });
    }

    // Generic error
    throw new InternalServerErrorException({
      status: false,
      message: 'Something went wrong while creating company.',
      error: e.message,
    });
  }
}
}

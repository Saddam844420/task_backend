import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyResolver, PrismaService]
})
export class CompanyModule {}

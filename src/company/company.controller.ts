import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';

import { CreateCompanyDto } from './dto/company.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}


  @UseGuards(AuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getCompanies() {
    return this.companyService.getCompanies();
  }

  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    return this.companyService.createCompany(companyData);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

import { CreateCompanyDto } from './dto/company.dto';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompanies() {
    return this.companyService.getCompanies();
  }

  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    return this.companyService.createCompany(companyData);
  }
}

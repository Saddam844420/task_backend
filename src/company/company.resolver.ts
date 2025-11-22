import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyModel } from './model/compnay.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateCompanyDto } from './dto/company.dto';

@Resolver()
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService){}

   
    @Query(() => [CompanyModel])
    @UseGuards(AuthGuard,RolesGuard)
    @Roles('ADMIN')
    async getCompanies(){
        return this.companyService.getCompanies();
    }

    @Mutation(()=> CompanyModel)
    async createCompany(
        @Args('data') data:CreateCompanyDto 
    ){
        return this.companyService.createCompany(data);
    }


}

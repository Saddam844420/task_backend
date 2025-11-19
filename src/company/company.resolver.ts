import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyModel } from './model/compnay.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Resolver()
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService){}

    @UseGuards(AuthGuard,RolesGuard)
    @Roles('ADMIN')
    @Query(() => [CompanyModel])
    async getCompanies(){
        return this.companyService.getCompanies();
    }
}

import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyModel } from './model/compnay.model';

@Resolver()
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService){}

    @Query(() => [CompanyModel])
    async getCompanies(){
        return this.companyService.getCompanies();
    }
}

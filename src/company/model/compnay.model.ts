import { ObjectType,Field } from "@nestjs/graphql";
import { TaxDetailModel } from "./taxDetailMOdel.model";
@ObjectType()
export class CompanyModel{

    @Field()
    id :string;
    @Field()
    name:string;
    @Field()
    address:string;
    @Field()
    email:string;
    @Field()
    phone:string;
    @Field(() => [TaxDetailModel])
    taxDetails: TaxDetailModel[];

}
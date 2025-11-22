import { ObjectType,Field } from "@nestjs/graphql";
import { TaxDetailModel } from "./taxDetailMOdel.model";
import { UserModel } from "./user.model";
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
    @Field(() => [TaxDetailModel], { nullable: true })
    taxDetail: TaxDetailModel[];

    @Field(()=>[UserModel],{nullable:true})
    user:UserModel[];



}
import { ObjectType,Field } from "@nestjs/graphql";

@ObjectType()
export class TaxDetailModel{

    @Field()
    id:string;
    @Field()
    taxType :string;
    @Field()
    taxNumber:string;
   

}
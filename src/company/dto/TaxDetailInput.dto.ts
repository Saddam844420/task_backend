import { InputType,Field } from "@nestjs/graphql";
@InputType()
export class TaxDetailInputDto{
    @Field()
    companyId: number;
    @Field()
    taxType:string;
    @Field()
    taxNumber:string;
}
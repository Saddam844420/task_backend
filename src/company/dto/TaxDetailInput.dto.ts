import { InputType,Field } from "@nestjs/graphql";
@InputType()
export class TaxDetailInputDto{
    @Field()
    taxType:string;
    @Field()
    taxNumber:string;
}
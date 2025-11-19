import { InputType,Field } from "@nestjs/graphql";
import { TaxDetailInputDto } from "./TaxDetailInput.dto";
@InputType()
export class CreateCompanyDto{
    @Field()
    name:string;
    @Field()
    address:string;
    @Field()
    email:string;
    @Field()
    phone:string;

    @Field(() => [TaxDetailInputDto])
    taxDetails: TaxDetailInputDto[];
}
import { ObjectType,Field,Args } from "@nestjs/graphql";
@ObjectType()

export class DepartmentModel{
    @Field()
    name:string
    @Field()
    id:string
    @Field()
    companyId:string
}

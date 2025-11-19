import { ObjectType,Field,Args } from "@nestjs/graphql";
@ObjectType()

export class DepartmentModel{
    @Field()
    department:string
    @Field()
    id:string
}

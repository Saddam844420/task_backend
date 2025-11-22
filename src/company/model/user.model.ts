import { ObjectType,Field } from "@nestjs/graphql";

@ObjectType()

export class UserModel{
    @Field()
    id:number
    @Field()
    name:string
    
    @Field()
    email:string

    @Field()
    role:string

    @Field()
    isMailVerified:boolean
}
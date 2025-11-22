import { InputType,Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
@InputType()
export class TaxDetailInputDto {
  @Field()
  @IsString()
  taxType: string;

  @Field()
  @IsString()
  taxNumber: string;
}

import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TaxDetailInputDto } from "./TaxDetailInput.dto";

@InputType()
export class CreateCompanyDto {

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  adminName: string;

  @Field(() => [TaxDetailInputDto])
  @ValidateNested({ each: true })
  @Type(() => TaxDetailInputDto)
  taxDetails: TaxDetailInputDto[];
}

import { IsOptional, MinLength } from 'class-validator';
import * as GraphQLTypes from '@/graphql/types';

export class UpdateCoffeeInputDto extends GraphQLTypes.UpdateCoffeeInput {
  @IsOptional()
  @MinLength(3)
  declare name: string;
}

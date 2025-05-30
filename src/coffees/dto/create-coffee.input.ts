import { MinLength } from 'class-validator';
import * as GraphQLTypes from '@/graphql/types';

export class CreateCoffeeInputDto extends GraphQLTypes.CreateCoffeeInput {
  @MinLength(3)
  declare name: string;
}

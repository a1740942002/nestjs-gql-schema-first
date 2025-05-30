import { ResolveField } from '@nestjs/graphql';
import { Parent } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '@/graphql/types';
import { FlavorsByCoffeeLoader } from './flavors-by-coffee.loader';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: GraphQLTypes.Coffee) {
    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}

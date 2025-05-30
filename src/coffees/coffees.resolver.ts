import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Coffee, CreateCoffeeInput } from 'src/graphql/types';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }

  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return null;
  }

  @Mutation('createCoffee') // notice we're decoupled the name from the actual GQL mutation name 'createCoffee'
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ): Promise<Coffee> {
    return {
      ...createCoffeeInput,
      id: 1,
    };
  }
}

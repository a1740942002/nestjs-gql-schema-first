import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Coffee } from 'src/graphql';

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
}

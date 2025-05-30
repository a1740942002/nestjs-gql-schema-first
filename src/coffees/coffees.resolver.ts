import { ParseIntPipe } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ID,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import * as GraphQLTypes from '@/graphql/types';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInputDto } from './dto/create-coffee.input';
import { UpdateCoffeeInputDto } from './dto/update-coffee.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query('coffees')
  async findAll(): Promise<GraphQLTypes.Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query(() => GraphQLTypes.Coffee, { name: 'coffee' })
  async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput')
    createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput')
    updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.remove(id);
  }

  @Subscription(() => GraphQLTypes.Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterableIterator('coffeeAdded');
  }
}

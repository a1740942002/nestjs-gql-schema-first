import { ResolveField } from '@nestjs/graphql';
import { Parent } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { FlavorEntity } from './entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(FlavorEntity)
    private readonly flavorsRepository: Repository<FlavorEntity>,
  ) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: CoffeeEntity) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}

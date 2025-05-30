import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from '@/graphql/types';
import { CoffeeEntity } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';
import { FlavorEntity } from './entities/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeesRepository: Repository<CoffeeEntity>,
    @InjectRepository(FlavorEntity)
    private readonly flavorsRepository: Repository<FlavorEntity>,
    private readonly pubSub: PubSub,
  ) {}

  // preloadFlavorByName method - for CoffeesService
  private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }

  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    if (!coffee) {
      // ⚠️ If you use the latest version of Apollo (>= v4), import "UserInputError" from "@nestjs/graphql"
      // Users that still depend on Apollo v3 can import this class from the "apollo-server-express" package
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: GraphQLTypes.CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
      type:
        createCoffeeInput.type === null ? undefined : createCoffeeInput.type,
    });

    const newCoffeeEntity = await this.coffeesRepository.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
    return newCoffeeEntity;
  }

  async update(
    id: number,
    _updateCoffeeInput: GraphQLTypes.UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    const updateCoffeeInput = {
      name:
        _updateCoffeeInput.name === null ? undefined : _updateCoffeeInput.name,
      brand:
        _updateCoffeeInput.brand === null
          ? undefined
          : _updateCoffeeInput.brand,
      flavors:
        _updateCoffeeInput.flavors === null
          ? undefined
          : _updateCoffeeInput.flavors,
    };

    const flavors =
      updateCoffeeInput.flavors && // 👈 new
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number): Promise<GraphQLTypes.Coffee> {
    const coffee = await this.findOne(id);
    const result = { ...coffee };
    await this.coffeesRepository.remove(coffee);
    return result;
  }
}

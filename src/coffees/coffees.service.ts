import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from '@/graphql/types';

@Injectable()
export class CoffeesService {
  async findAll() {
    return [];
  }

  async findOne(id: number) {
    return null;
  }

  async create(createCoffeeInput: GraphQLTypes.CreateCoffeeInput) {
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from 'src/graphql/types';

@Injectable()
export class CoffeesService {
  async findAll() {
    return [];
  }

  async findOne(id: number) {
    return null;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}

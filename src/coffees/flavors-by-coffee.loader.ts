// - Request Scoped FlavorsByCoffeeLoader - utilizing the DataLoadaer
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, FlavorEntity[]> {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeesRepository: Repository<CoffeeEntity>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    coffeeIds: readonly number[],
  ): Promise<FlavorEntity[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'], // since we don't really need a coffee object here
      relations: ['flavors'], // to fetch related flavors
      where: {
        id: In(coffeeIds as number[]), // to make sure we only query requested coffees
      },
    });

    // to map an array of coffees two a 2-dimensional array of flavors where position in the array indicates to which coffee flavors belong
    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}

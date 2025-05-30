import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { PubSubModule } from '@/pub-sub/pub-sub.module';
import { FlavorsByCoffeeLoader } from './flavors-by-coffee.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity]),
    PubSubModule,
  ],
  providers: [
    CoffeesResolver,
    CoffeesService,
    CoffeeFlavorsResolver,
    FlavorsByCoffeeLoader,
  ],
})
export class CoffeesModule {}

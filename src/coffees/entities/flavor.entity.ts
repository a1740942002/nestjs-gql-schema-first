import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as GraphQLTypes from '@/graphql/types';
import { Column } from 'typeorm';
import { CoffeeEntity } from './coffee.entity';

@Entity()
export class FlavorEntity implements GraphQLTypes.Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => CoffeeEntity, (coffee) => coffee.flavors)
  coffees: CoffeeEntity[];
}

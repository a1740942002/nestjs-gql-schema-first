import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as GraphQLTypes from '@/graphql/types';
import { FlavorEntity } from './flavor.entity';

@Entity()
export class CoffeeEntity implements GraphQLTypes.Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    (type) => FlavorEntity,
    (flavor) => flavor.coffees /* inverse side */,
    {
      cascade: true, // 👈
    },
  )
  flavors: FlavorEntity[];

  @CreateDateColumn()
  createdAt?: Date | null;

  @Column({ nullable: true })
  type: GraphQLTypes.CoffeeType;
}

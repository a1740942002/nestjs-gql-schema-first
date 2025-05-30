import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as GraphQLTypes from 'src/graphql/types';

@Entity()
export class Coffee implements GraphQLTypes.Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  flavors: string[];
}

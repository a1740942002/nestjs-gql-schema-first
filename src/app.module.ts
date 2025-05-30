import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from './common/scalars/date.scalar';
import { DrinksResolver } from './drinks/drinks.resolver';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gql-schema',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: {
        isHeadersEditorEnabled: true,
      },
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    CoffeesModule,
  ],

  controllers: [AppController],
  providers: [AppService, DateScalar, DrinksResolver],
})
export class AppModule {}

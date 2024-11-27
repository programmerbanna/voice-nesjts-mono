/**
 * Package imports
 * NestJS
 */
import { join } from 'path';
import { Module } from '@nestjs/common';

/**
 * Package imports
 * GraphQL
 */
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';

/**
 * Custom imports
 * Services | Modules
 */
import { AppService } from './app.service';
import { ProfessionalModule } from './professional/professional.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ProfessionalModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}

import 'reflect-metadata';
import 'dotenv-safe/config';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { User, Post, Image } from './server/entities';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './server/graphql/resolvers';
import express from 'express';
import path from 'path';
import cors from 'cors';
import colors from 'colors';

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  const conn = await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_URL,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
    migrations: [path.join(__dirname, './server/migrations/*')],
    entities: [User, Post, Image]
  });

  await conn.runMigrations();
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    }),
    playground: true,
    context: ({ req, res }) => ({
      req,
      res
    })
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(PORT, () => console.log(colors.green(`running on port ${PORT}`)));
};

startServer().catch(err =>
  console.error(colors.red(`Error starting server ${err.message}`))
);

import 'reflect-metadata';
import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './server/graphql/resolvers';
import express from 'express';
import path from 'path';
import cors from 'cors';
import colors from 'colors';

config();

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, './server/migrations/*')],
    entities: [],
  });

  await conn.runMigrations();
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    playground: true,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => console.log(colors.green(`running on port ${PORT}`)));
};

startServer().catch((err) =>
  console.error(colors.red(`Error starting server ${err.message}`))
);

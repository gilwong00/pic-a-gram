import 'reflect-metadata';
import 'dotenv-safe/config';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { User, Post, Image, Like, Comment } from './server/entities';
import { buildSchema } from 'type-graphql';
import {
  CommentResolver,
  HelloResolver,
  LikeResolver,
  PostResolver,
  UserResolver
} from './server/graphql/resolvers';
import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import colors from 'colors';

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  const app = express();

  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_URL,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
    migrations: [path.join(__dirname, './server/migrations/*')],
    entities: [User, Post, Image, Like, Comment]
  });

  // await conn.runMigrations();

  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production'
          ? 'prod url'
          : 'http://localhost:3000'
    })
  );

  app.use(
    session({
      name: 'user',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
        httpOnly: true,
        sameSite: 'lax' //csrf
      }
    })
  );

  // maybe we can use a federation schema
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        LikeResolver,
        PostResolver,
        UserResolver,
        CommentResolver
      ]
    }),
    playground: true,
    context: ({ req, res }) => ({
      req,
      res
    }),
    formatError: err => {
      console.error(colors.red(`Error: ${err.message}\n`));
      return err;
    }
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

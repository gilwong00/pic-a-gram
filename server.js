require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const Post = require('./models/Post');
const Comments = require('./models/Comments');
const PORT = process.env.PORT || 5000;
const { ApolloServer } = require('apollo-server');

mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once('open', () => console.log(colors.green('connected to mongodb')))
  .on('err', (err) =>
    console.log(colors.red('error connecting to mongodb:', err))
  );

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { Post, Comments };
  },
});

server
  .listen(PORT)
  .then(({ url }) => console.log(colors.green(`Running on port ${url}`)));

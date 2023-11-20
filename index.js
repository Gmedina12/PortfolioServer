import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {resolvers} from './src/Resolvers/resolvers.js'
import { typeDefs } from './src/Schema/Schema.js';

async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); 
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () => {
    console.log(`Server at http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startServer(); 

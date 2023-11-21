import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {resolvers} from './src/Resolvers/resolvers.js'
import { typeDefs } from './src/Schema/Schema.js';
import bodyParser from 'body-parser';
import http from 'http'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

async function startServer() {
  const app = express();
  const corsOptions = {
    origin: '*',
    credentials: true,
  }
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
  const httpServer = http.createServer(app);

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer
      }),
      ApolloServerPluginLandingPageLocalDefault({
        embed: true
      })
    ],
    introspection: true,
    playground: true
   });
  await server.start(); 
  server.applyMiddleware({ 
     app,
     cors: corsOptions,
     path:'/'
    });

  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () => {
    console.log(`Server at http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startServer(); 

// config cors access point

// cors:
//   origins:
//     - https://studio.apollographql.com
//     - "*"
//   allow_credentials: true
// headers:
//   subgraphs:
//     portfolio-o1g2b3ms5-gina-paola-medinas-projects:
//       request:
//         - propagate:
//             matching: ".*"
// include_subgraph_errors:
//   all: true
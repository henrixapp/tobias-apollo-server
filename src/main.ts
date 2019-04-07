
import { ApolloServer } from 'apollo-server-express';

import { environment } from './environment';
import AttachmentController from "./controllers/attachments"
import resolvers from './resolvers';
import typeDefs from './schemas';
import mongoose from "mongoose"
import express from "express"
import { UserModel } from './models/user';


  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: environment.apollo.introspection,
    playground: environment.apollo.playground,
    context:({req})=> {
      let user = UserModel.findOne({username:req.headers["X-Forwarded-User"]||"henrik"})
      return {user}
    }
  });

  const app = express();
  server.applyMiddleware({ app });
  app.get("/attachments/:id",AttachmentController.attachment)
  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
  );
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
  }


import { ApolloServer } from 'apollo-server';

import { environment } from './environment';
import resolvers from './resolvers';
import typeDefs from './schemas';

import  mongoose from 'mongoose';
import { UserModel } from './models/user';

mongoose.connect('mongodb://localhost:27017/test');

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  context:{
    mongoose
  }
});

server.listen(environment.port)
  .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
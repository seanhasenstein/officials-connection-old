import { ApolloServer } from 'apollo-server-micro';
import Messages from '../../api/contact/contact.graphql';
import messageResolvers from '../../api/contact/resolvers';

const typeDefs = Messages;
const resolvers = messageResolvers;

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });

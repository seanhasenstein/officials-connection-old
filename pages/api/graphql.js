import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import { mergeTypeDefs, mergeResolvers } from 'graphql-toolkit';
import connectDb from '../../lib/mongoose';
import messageTypeDefs from '../../api/contact/contact.graphql';
import messageResolvers from '../../api/contact/contact.resolvers';
import campTypeDefs from '../../api/camp/camp.graphql';
import campResolvers from '../../api/camp/camp.resolvers';
import registrationTypeDefs from '../../api/registration/registration.graphql';
import registrationResolvers from '../../api/registration/registration.resolvers';
import camperTypeDefs from '../../api/camper/camper.graphql';
import camperResolvers from '../../api/camper/camper.resolvers';

const typeDefs = mergeTypeDefs([
  messageTypeDefs,
  campTypeDefs,
  registrationTypeDefs,
  camperTypeDefs,
]);
const resolvers = mergeResolvers([
  messageResolvers,
  campResolvers,
  registrationResolvers,
  camperResolvers,
]);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ schema });

const server = apolloServer.createHandler({ path: '/api/graphql' });

export default connectDb(server);

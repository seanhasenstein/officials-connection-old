import {
  ApolloServer,
  makeExecutableSchema,
  AuthenticationError,
} from 'apollo-server-micro';
import { mergeTypeDefs, mergeResolvers } from 'graphql-toolkit';
import middleware from '../../lib/middleware';
import jwt from 'jsonwebtoken';
import messageTypeDefs from '../../api/contact/contact.graphql';
import messageResolvers from '../../api/contact/contact.resolvers';
import campTypeDefs from '../../api/camp/camp.graphql';
import campResolvers from '../../api/camp/camp.resolvers';
import registrationTypeDefs from '../../api/registration/registration.graphql';
import registrationResolvers from '../../api/registration/registration.resolvers';
import Camper from '../../api/camper/camper.model';
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

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const { token } = req.cookies;
    if (token) {
      // destructure camperId from jwt token
      const { camperId } = jwt.verify(token, process.env.JWT_SECRET);
      // put camperId onto the req for future requests to access
      req.camperId = camperId;
    }

    if (!req.camperId) return { req, res };
    const camper = await Camper.findById(req.camperId);
    req.camper = camper;

    return {
      req,
      res,
    };
  },
});

const server = apolloServer.createHandler({
  path: '/api/graphql',
  cors: {
    origin: 'http://localhost:3000/',
    credentials: true,
  },
});
export default middleware(server);

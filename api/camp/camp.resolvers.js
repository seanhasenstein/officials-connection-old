import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { formatTime } from '../../utils';

const stripeResolvers = {
  Query: {
    // ************* CAMP QUERY ************* //
    async camp(_, { id }) {
      const camp = await stripe.products
        .retrieve(id)
        .catch(error => console.error(error));
      const sessions = camp.skus.data.map(
        ({ id, product, price, active, livemode, attributes }) => {
          const splitClasses = attributes.wiaaClassifications.split(' ');
          const splitDates = attributes.dates.split(' ');
          const splitTimeFrames = attributes.timeFrames.split(' ');

          return {
            id,
            product,
            price,
            active,
            livemode,
            attributes: {
              wiaaClassifications: splitClasses,
              dates: splitDates,
              timeFrames: splitTimeFrames,
              mechanics: attributes.mechanics,
              competitionLevel: attributes.competitionLevel,
            },
          };
        }
      );

      return {
        ...camp,
        sessions,
      };
    },
    // ************* SESSION QUERY ************* //
    async session(_, { id }) {
      const session = await stripe.skus.retrieve(id).catch(e => console.log(e));
      const splitClasses = session.attributes.wiaaClassifications.split(' ');
      const splitDates = session.attributes.dates.split(' ');
      const splitTimeFrames = session.attributes.timeFrames.split(' ');
      return {
        ...session,
        attributes: {
          wiaaClassifications: splitClasses,
          dates: splitDates,
          timeFrames: splitTimeFrames,
          competitionLevel: session.attributes.competitionLevel,
          mechanics: session.attributes.mechanics,
        },
      };
    },
  },
  Mutation: {
    // ************* CREATE CAMP MUTATION ************* //
    async createCamp(_, { input: { name, attributes } }) {
      const camp = await stripe.products.create({
        name,
        attributes,
      });
      return camp;
    },
    // ************* CREATE SESSION MUTATION ************* //
    async createSession(
      _,
      {
        input: {
          product,
          price,
          competitionLevel,
          wiaaClassifications,
          dates,
          timeFrames,
          mechanics,
        },
      }
    ) {
      const session = await stripe.skus.create({
        product,
        price,
        attributes: {
          competitionLevel,
          wiaaClassifications,
          dates,
          timeFrames,
          mechanics,
        },
        currency: 'usd',
        inventory: {
          type: 'infinite',
        },
      });
      const splitClasses = session.attributes.wiaaClassifications.split(' ');
      const splitDates = session.attributes.dates.split(' ');
      const splitTimeFrames = session.attributes.timeFrames.split(' ');
      return {
        ...session,
        attributes: {
          wiaaClassifications: splitClasses,
          dates: splitDates,
          timeFrames: splitTimeFrames,
          competitionLevel: session.attributes.competitionLevel,
          mechanics: session.attributes.mechanics,
        },
      };
    },
  },
};

export default stripeResolvers;

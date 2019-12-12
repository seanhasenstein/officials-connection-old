import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeResolvers = {
  Query: {
    async camp(_, { id }) {
      const camp = await stripe.products
        .retrieve(id)
        .catch(e => console.log(e));
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
    async createCamp(_, { input: { name, attributes } }) {
      const camp = await stripe.products.create({
        name,
        attributes,
      });
      return camp;
    },
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

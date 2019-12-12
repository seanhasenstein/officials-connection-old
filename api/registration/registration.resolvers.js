const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Registration from './registration.model';

const resolvers = {
  // Query: {},
  Mutation: {
    async createRegistration(_parent, { input }, _ctx, _info) {
      // 1. Recalculate the registration total
      const regTotal = input.sessions.reduce(
        async (accumulator, session, index) => {
          const sku = await stripe.skus.retrieve(session);
          (await accumulator).push(sku.price);
        },
        []
      );
      console.log(regTotal);
      // 2. Create the Stripe charge
      const charge = await stripe.charges
        .create({
          amount: input.total,
          currency: 'usd',
          description: `Registration for ${input.email}`,
          source: input.token,
          receipt_email: input.email,
        })
        .catch(error => console.error(error));
      // 3. Create the Registration
      const registration = await Registration.create({
        charge: charge.id,
        total: input.total,
        sessions: input.sessions,
        camper: input.email,
        notes: input.notes,
        liabilityAgreement: input.liablilityAgreement,
      }).catch(error => console.error(error));
      // console.log('registration: ', registration);
      // 4. Return the Registration to the client
      return registration;
    },
  },
  Registration: {
    id(registration, _args, _ctx, _info) {
      return `${registration._id}`;
    },
  },
};

export default resolvers;

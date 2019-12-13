const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Registration from './registration.model';
import Camper from '../camper/camper.model';
import { formatTime } from '../../utils';

const resolvers = {
  Query: {
    // ************* REGISTRATION QUERY ************* //
    async registration(_parent, args, _ctx, _info) {
      const registration = await Registration.findById(args.id);
      return registration;
    },
  },
  Mutation: {
    // ************* CREATE REGISTRATION MUTATION ************* //
    async createRegistration(_parent, { input }, _ctx, _info) {
      // 1. Check the total amount server side
      let serverTotal = 0;
      for (let i = 0; i < input.sessions.length; i++) {
        const sku = await stripe.skus.retrieve(input.sessions[i]);
        serverTotal = sku.price + serverTotal;
      }

      // check if input.email is connected with a current camper
      const prevCamper = await Camper.findOne({ email: input.email })
        .lean()
        .exec();
      let camperId;
      // if camper exists in DB get the id
      if (prevCamper) camperId = prevCamper._id;
      // if this is a new camper
      if (!prevCamper) {
        // 1. create the camper
        const camper = await Camper.create({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          address: {
            street1: input.street1,
            street2: input.street2 || '',
            city: input.city,
            state: input.state,
            zipcode: input.zipcode,
          },
          wiaaNumber: input.wiaaNumber,
          wiaaClassification: input.wiaaClassification,
          foodAllergies: input.foodAllergies,
          emergencyContact: {
            name: input.emergencyContactName,
            phone: input.emergencyContactPhone,
          },
          password: input.password,
        });
        // assign the newly creacted campers id
        camperId = camper._id;
      }

      // 2. Create the Stripe charge
      const charge = await stripe.charges
        .create({
          amount: serverTotal,
          currency: 'usd',
          description: `Registration for ${input.firstName} ${input.lastName} <${input.email}>`,
          source: input.token,
          receipt_email: input.email,
          metadata: {
            camperId: `${camperId}`,
            camperName: `${input.firstName} ${input.lastName}`,
            camperEmail: input.email,
            camperPhone: input.phone,
            sessions: input.sessions.join(', '),
          },
        })
        .catch(error => console.error(error));
      // 3. Create the Registration
      const registration = await Registration.create({
        charge: charge.id,
        total: serverTotal,
        sessions: input.sessions,
        camper: camperId,
        notes: input.notes,
        liabilityAgreement: input.liablilityAgreement,
      }).catch(error => console.error(error));
      console.log('registration: ', registration);

      // 4. add the new registration id to the camper
      await Camper.updateOne(
        { _id: camperId },
        { $push: { registrations: registration._id } }
      );

      // 5. Return the Registration to the client
      return registration;
    },
  },
  // ************* REGISTRATION TYPE ************* //
  Registration: {
    id(registration, _args, _ctx, _info) {
      return `${registration._id}`;
    },
    async camper(registration, _args, _ctx, _info) {
      const camper = await Camper.findById(registration.camper);
      return camper;
    },
    async sessions(registration, _args, _ctx, _info) {
      const sessions = await registration.sessions.map(async session => {
        const stripeSession = await stripe.skus.retrieve(session);
        const wiaaClassifications = stripeSession.attributes.wiaaClassifications.split(
          ' '
        );
        const dates = stripeSession.attributes.dates.split(' ');
        const timeFrames = stripeSession.attributes.timeFrames.split(' ');
        return {
          ...stripeSession,
          attributes: {
            wiaaClassifications,
            dates,
            timeFrames,
            competitionLevel: stripeSession.attributes.competitionLevel,
            mechanics: stripeSession.attributes.mechanics,
          },
        };
      });
      return sessions;
    },
    created_at(registration, _args, _ctx, _info) {
      return formatTime(registration.created_at);
    },
    updated_at(registration, _args, _ctx, _info) {
      return formatTime(registration.updated_at);
    },
  },
};

export default resolvers;

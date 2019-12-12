import Camper from './camper.model';

const resolvers = {
  Query: {
    async camper(parent, args, _ctx, _info) {
      const camper = await Camper.findById(args.id)
        .lean()
        .exec();
      console.log(camper);
      return camper;
    },
  },
  Mutation: {
    async newCamper(_parent, { input }, _ctx, _info) {
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
      });

      return camper;
    },
  },
  Camper: {
    id(camper, _args, _ctx, _info) {
      return `${camper._id}`;
    },
  },
};

export default resolvers;

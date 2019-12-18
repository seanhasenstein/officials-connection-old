import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-micro';
import Camper from './camper.model';
import Registration from '../registration/registration.model';

const resolvers = {
  Query: {
    // ************* CAMPER QUERY ************* //
    async camper(_parent, _args, { req }, _info) {
      // Check if they are logged in
      if (!req.camperId) {
        return null;
      }
      // if they are logged in then query the camper
      const camper = await Camper.findById(req.camperId)
        .lean()
        .exec();
      return camper;
    },
  },
  Mutation: {
    // ************* NEW CAMPER MUTATION ************* //
    async newCamper(_parent, { input }, _ctx, _info) {
      // hash password
      const password = await bcrypt
        .hash(input.password, 10)
        .catch(error => console.error(error));

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
        password,
      });

      return camper;
    },
    // ************* LOGIN MUTATION ************* //
    async camperLogin(_parent, { email, password }, { req, res }, _info) {
      // 1. Check if there is a user with that email
      const camper = await Camper.findOne({ email })
        .lean()
        .exec();
      if (!camper) throw new Error(`${email} is incorrect.`);
      // 2. Check if there password is correct
      const validPassword = await bcrypt
        .compare(password, camper.password)
        .catch(error => console.error(error));
      if (!validPassword) throw new Error('Invalid Password');

      // 3. Generate the JWT Token
      const token = jwt.sign({ camperId: camper._id }, process.env.JWT_SECRET);

      // 4. Set the cookie with the JWT Token
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      // 5. Return the user
      return camper;
    },
    // ************* LOGOUT MUTATION ************* //
    camperLogout(_parent, args, ctx, info) {
      console.log(ctx.res);
      ctx.res.clearCookie('token');
      return { message: 'You are successfully logged out.' };
    },
  },
  // ************* CAMPER TYPE ************* //
  Camper: {
    id(camper, _args, _ctx, _info) {
      return `${camper._id}`;
    },
    async registrations(camper, _args, _ctx, _info) {
      const registrations = await camper.registrations.map(async reg => {
        return await Registration.findById(reg)
          .lean()
          .exec();
      });
      return registrations;
    },
  },
};

export default resolvers;

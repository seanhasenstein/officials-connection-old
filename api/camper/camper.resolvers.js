import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { AuthenticationError } from 'apollo-server-micro';
import Camper from './camper.model';
import Registration from '../registration/registration.model';
import mailgun from 'mailgun-js';
import { createResetEmail } from '../../lib/mjml/password';

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
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      // 5. Return the user
      return camper;
    },
    // ************* LOGOUT MUTATION ************* //
    camperLogout(_parent, args, ctx, _info) {
      ctx.res.clearCookie('token');
      return { message: 'You are successfully logged out.' };
    },
    async resetRequest(_parent, args, _ctx, _info) {
      // 1. Check if this is a real camper
      const camper = await Camper.findOne({ email: args.email });
      console.log(camper);
      if (!camper) {
        throw new Error(`No user found with the email ${args.email}`);
      }

      // 2. Set a reset token and expiry on that camper
      const randomBytesPromisified = promisify(randomBytes);
      const resetToken = (await randomBytesPromisified(20)).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // expires in 1 hour
      const res = await Camper.findOneAndUpdate(
        { email: args.email },
        { resetToken, resetTokenExpiry },
        { new: true }
      );
      console.log(res);

      // 3. Email the camper the reset token
      const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      });

      await mg
        .messages()
        .send({
          from: 'Officials Connection <wbyoc@officialsconnection.org>',
          to: camper.email,
          subject: 'Your Password Reset Token',
          text: `http://localhost:3000/reset?resetToken=${resetToken}`,
          html: createResetEmail(resetToken),
        })
        .catch(error => {
          console.error(error);
          throw new Error('There was an error with the MailGun API!');
        });

      // 4. Return the message
      return {
        message: `Reset instructions were sent to ${args.email}`,
      };
    },
    async resetPassword(_parent, args, ctx, _info) {
      // 1. Check if the passwords match
      if (args.password !== args.confirmPassword) {
        throw new Error("The passwords don't match!");
      }
      // 2. Check if the token is legit
      const camper = await Camper.findOne({ resetToken: args.resetToken });
      if (!camper) throw new Error('This reset token is invalid.');
      // 3. Check if the token is expired
      if (camper.resetTokenExpiry < Date.now - 3600000) {
        throw new Error('This reset token has expired!');
      }
      // 4. Hash the new password
      const password = await bcrypt.hash(args.password, 10);
      // 5. Save the new password to the camper and remove old resetToken and resetTokenExpiry
      const updatedCamper = await Camper.findByIdAndUpdate(
        camper._id,
        { password, resetToken: null, resetTokenExpiry: null },
        { new: true }
      );
      // 6. Generate JWT
      const token = jwt.sign(
        { camperId: updatedCamper._id },
        process.env.JWT_SECRET
      );
      console.log('token: ', token);
      // 7. Set the JWT cookie
      ctx.res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      // 8. return the camper
      return updatedCamper;
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

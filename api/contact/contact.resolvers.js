import ContactMessage from './contact.model';
import { convertTime } from '../../utils';

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const contactResolvers = {
  Query: {
    async message(_parent, args, _ctx, _info) {
      const message = await ContactMessage.findById(args.id)
        .lean()
        .exec();

      return {
        ...message,
        created_at: convertTime(message.created_at),
      };
    },
    async messages(_parent, args, _ctx, _info) {
      const messages = await ContactMessage.find({});
      return messages;
    },
  },
  Mutation: {
    async newMessage(
      _parent,
      { input: { name, email, phone, message } },
      _ctx,
      _info
    ) {
      // format data to send to MailGun
      const data = {
        from: 'OfficialsConnection <wbyoc@officialsconnection.org>',
        to: 'seanhasenstein@gmail.com',
        subject: `Contact Form Message from ${name}`,
        text: `Name: ${name} \nEmail: ${email} \nPhone: ${phone} \nMessage: \n${message}`,
      };

      // send data to MailGun
      await mailgun
        .messages()
        .send(data)
        .catch(error => {
          console.error(error);
          throw new Error('There was an error with the MailGun API!');
        });

      const result = await ContactMessage.create({
        name,
        email,
        phone,
        message,
      });

      return result;
    },
    async deleteMessage(_parent, args, _ctx, _info) {
      const message = await ContactMessage.findByIdAndDelete(args.id);
      return message;
    },
  },
  Message: {
    id(message, _args, _ctx, _info) {
      return `${message._id}`;
    },
    created_at(message, args, _ctx, _info) {
      return convertTime(message.created_at);
    },
  },
};

export default contactResolvers;

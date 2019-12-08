const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const contactResolvers = {
  Query: {
    me() {
      return 'helloooo from me query!';
    },
  },
  Mutation: {
    async newMessage(_, { input: { name, email, phone, message } }) {
      const data = {
        from: 'OfficialsConnection <wbyoc@officialsconnection.org>',
        to: 'seanhasenstein@gmail.com',
        subject: `Contact Form Message from ${name}`,
        text: `Name: ${name} \nEmail: ${email} \nPhone: ${phone} \nMessage: \n${message}`,
      };

      await mailgun
        .messages()
        .send(data)
        .catch(error => {
          console.error(error);
          throw new Error('There was an error with the MailGun API!');
        });

      return { name, email, phone, message };
    },
  },
};

export default contactResolvers;

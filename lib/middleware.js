import mongoose from 'mongoose';
import { serialize } from 'cookie';
import merge from 'utils-merge';

// Clear cookie
const clearCookie = (res, name, options = {}) => {
  const opts = merge({ expires: new Date(1) }, options);

  cookie(res, name, '', opts);
};

// Set the `cookie` on the res object
const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

const middleware = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
  }

  res.clearCookie = (name, options) => clearCookie(res, name, options);
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to mongo');
});

export default middleware;

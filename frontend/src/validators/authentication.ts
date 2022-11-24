import Schema from 'async-validator';

export const SIGN_IN_REQUEST_VALIDATOR = new Schema({
  email: {
    required: true, message: "Please provide a email"
  },
  password: {
    required: true, message: "Please provide a password"
  }
});

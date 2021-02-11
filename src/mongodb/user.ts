import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  gMail: String,
  identifier: Number,
  wins: Number,
  loses: Number,
  guesses: Number,
});

const UserModel = model('User', userSchema);
export { UserModel };

import { model, Schema } from 'mongoose';

const friendSchema = new Schema({
  userId: String,
  friendId: String,
});

const FriendModel = model('Friend', friendSchema);
export { FriendModel };

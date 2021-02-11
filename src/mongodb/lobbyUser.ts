import { model, Schema } from 'mongoose';

const lobbyUserSchema = new Schema({
  userId: String,
  lobbyId: String,
});

const LobbyUserModel = model('LobbyUser', lobbyUserSchema);
export { LobbyUserModel };

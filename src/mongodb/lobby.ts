import { model, Schema } from 'mongoose';

const lobbySchema = new Schema({
  name: String,
  userId: String,
  identifier: String,
  isPublic: Boolean,
  maxPlayer: Number,
  currentPlayer: Number,
});

const LobbyModel = model('Lobby', lobbySchema);
export { LobbyModel };

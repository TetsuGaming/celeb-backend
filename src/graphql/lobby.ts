import { LobbyModel } from '../mongodb';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const LobbyType = new GraphQLObjectType({
  name: 'Lobby',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    identifier: { type: GraphQLString },
    isPublic: { type: GraphQLBoolean },
    maxPlayer: { type: GraphQLInt },
    currentPlayer: { type: GraphQLInt }
  })
});

function generateLobbyId(): string {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}

export const LobbyFieldsForRootQuery = {
  lobbies: {
    type: new GraphQLList(LobbyType),
    args: { isPublic: { type: GraphQLBoolean } },
    resolve(parent, argument) {
      return LobbyModel.find({ isPublic: { $all: [ argument.isPublic ] } });
    }
  },
  lobby: {
    type: LobbyType,
    args: { identifier: { type: GraphQLString } },
    resolve(parent, argument) {
      return LobbyModel.findOne({ identifier: argument.identifier });
    }
  }
};

// ToDo: Manage so that only lobby admin can change lobby stuff
export const LobbyFieldsForMutation = {
  addLobby: {
    type: LobbyType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      isPublic: { type: new GraphQLNonNull(GraphQLBoolean) },
      masterToken: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, { name, isPublic, masterToken }) {
      const lobby = new LobbyModel({
        name,
        isPublic,
        masterToken,
        maxPlayer: 5,
        currentPlayer: 1,
        identifier: generateLobbyId(),
      })
      return lobby.save();
    }
  },
  removeLobby: {
    type: LobbyType,
    args: { identifier: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(parent, { identifier }) {
      // ToDo: return correct values
      return LobbyModel.collection.deleteOne({ identifier });
    }
  },
  updateLobby: {
    type: LobbyType,
    args: {
      identifier: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      isPublic: { type: GraphQLBoolean },
      maxPlayer: { type: GraphQLInt },
    },
    async resolve(parent, { name, identifier, isPublic, maxPlayer }) {
      const searchQuery = { identifier };
      const updateObject = {} as any;

      if (name) updateObject.name = name;
      if (isPublic) updateObject.isPublic = isPublic;
      if (maxPlayer) updateObject.maxPlayer = maxPlayer;

      await LobbyModel.collection.updateOne(searchQuery, { $set: updateObject });
      return LobbyModel.findOne(searchQuery);
    }
  }
};

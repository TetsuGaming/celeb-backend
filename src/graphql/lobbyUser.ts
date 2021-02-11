import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { LobbyModel, LobbyUserModel, UserModel } from "../mongodb";

import { UserType } from "./user";
import { LobbyType } from "./lobby";

const LobbyUserType = new GraphQLObjectType({
  name: 'LobbyUser',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById(parent.userId);
      }
    },
    lobby: {
      type: LobbyType,
      resolve(parent, args) {
        return LobbyModel.findById(parent.lobbyId);
      }
    }
  })
});

export const LobbyUserFieldsForRootQuery = {
  lobbyUsers: {
    type: new GraphQLList(LobbyUserType),
    args: { id: { type: GraphQLID } },
    resolve(parent, argument) {
      return LobbyUserModel.find({ userId: { $all: [ argument.id ] } });
    }
  }
};

export const LobbyUserFieldsForMutation = {
  addUserToLobby: {
    type: LobbyUserType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      lobbyId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, { userId, lobbyId }) {
      const lobby = new LobbyUserModel({ userId, lobbyId, })
      return lobby.save();
    }
  },
  removeUserFromLobby: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      lobbyId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, { userId, lobbyId }) {
      let wasDeletionSuccessful = false;
      await LobbyUserModel.collection.deleteOne({ userId, lobbyId }).then(_ => wasDeletionSuccessful = true);

      return wasDeletionSuccessful;
    }
  }
};

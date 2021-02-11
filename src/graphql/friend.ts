import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { UserType } from "./user";
import { FriendModel, UserModel } from "../mongodb";

const FriendType = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById(parent.userId);
      }
    },
    friend: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById(parent.friendId);
      }
    }
  })
});

export const FriendFieldsForRootQuery = {
  friends: {
    type: new GraphQLList(FriendType),
    args: { id: { type: GraphQLID } },
    resolve(parent, argument) {
      return FriendModel.find({ userId: { $all: [ argument.id ] } });
    }
  }
};

export const FriendFieldsForMutation = {
  addFriend: {
    type: FriendType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      friendId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, argument) {
      const friend = new FriendModel({
        userId: argument.userId,
        friendId: argument.friendId,
      })
      return friend.save()
    }
  }
};

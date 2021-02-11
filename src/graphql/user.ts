import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";
import { UserModel } from "../mongodb";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gMail: { type: GraphQLString },
    identifier: { type: GraphQLInt },
    wins: { type: GraphQLInt },
    loses: { type: GraphQLInt },
    guesses: { type: GraphQLInt },
  })
});

export const UserFieldsForRootQuery = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, argument) {
      return UserModel.find(({ id }) => id == argument.id);
    }
  }
};

export const UserFieldsForMutation = {
  addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      identifier: { type: new GraphQLNonNull(GraphQLInt) },
      gMail: { type: GraphQLString },
      wins: { type: GraphQLInt },
      loses: { type: GraphQLInt },
      guesses: { type: GraphQLInt },
    },
    resolve(parent, argument) {
      const user = new UserModel({
        name: argument.name,
        identifier: argument.identifier,
        gMail: argument.gMail || '',
        wins: argument.wins || 0,
        loses: argument.loses || 0,
        guesses: argument.guesses || 0,
      })
      return user.save()
    }
  }
};

import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { CelebrityTypeModel, FriendModel } from '../mongodb';

export const CelebrityTypeType = new GraphQLObjectType({
  name: 'CelebrityType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});

export const CelebrityTypeFieldsForRootQuery = {
  celebrityTypes: {
    type: new GraphQLList(CelebrityTypeType),
    resolve(parent, argument) {
      return FriendModel.find({});
    }
  }
};

export const CelebrityTypeFieldsForMutation = {
  addCelebrityType: {
    type: CelebrityTypeType,
    args: { name: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(parent, { name }) {
      const celebrityType = new CelebrityTypeModel({ name });
      return celebrityType.save();
    }
  }
};

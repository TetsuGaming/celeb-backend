import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { UserFieldsForMutation, UserFieldsForRootQuery } from './user';
import { FriendFieldsForMutation, FriendFieldsForRootQuery } from './friend';
import { LobbyFieldsForMutation, LobbyFieldsForRootQuery } from './lobby';
import { LobbyUserFieldsForMutation, LobbyUserFieldsForRootQuery } from './lobbyUser';
import { CelebrityHintFieldsForMutation, CelebrityHintFieldsForRootQuery } from './celebrityHint';
import { CelebrityTypeFieldsForMutation, CelebrityTypeFieldsForRootQuery } from './celebrityType';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...UserFieldsForRootQuery,
    ...FriendFieldsForRootQuery,
    ...LobbyFieldsForRootQuery,
    ...LobbyUserFieldsForRootQuery,
    ...CelebrityHintFieldsForRootQuery,
    ...CelebrityTypeFieldsForRootQuery,
  }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserFieldsForMutation,
    ...FriendFieldsForMutation,
    ...LobbyFieldsForMutation,
    ...LobbyUserFieldsForMutation,
    ...CelebrityHintFieldsForMutation,
    ...CelebrityTypeFieldsForMutation,
  }
});

export const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });


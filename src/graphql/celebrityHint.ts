import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { CelebrityHintModel, CelebrityModel, CelebrityTypeModel } from "../mongodb";
import { CelebrityTypeType } from "./celebrityType";

const CelebrityType = new GraphQLObjectType({
  name: 'Celebrity',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
  })
});

const CelebrityHintType = new GraphQLObjectType({
  name: 'CelebrityHint',
  fields: () => ({
    celebId: {
      type: CelebrityType,
      resolve(parent, args) {
        return CelebrityModel.findById(parent.celebId);
      }
    },
    typeId: {
      type: CelebrityTypeType,
      resolve(parent, args) {
        return CelebrityTypeModel.findById(parent.typeId);
      }
    },
    hint: { type: GraphQLString },
  })
});

export const CelebrityHintFieldsForRootQuery = {
  celebrityHints: {
    type: new GraphQLList(CelebrityHintType),
    args: { celebrityId: { type: GraphQLID } },
    resolve(parent, { celebrityId }) {
      // Math.floor(Math.random() * celebrityCount);
      return CelebrityHintModel.find({ celebId: celebrityId });
    }
  }
};

export const CelebrityHintFieldsForMutation = {
  addCelebrity: {
    type: CelebrityType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      image: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, { name, image }) {
      const celebrity = new CelebrityModel({ name, image })
      return celebrity.save();
    }
  },
  addCelebrityHint: {
    type: CelebrityHintType,
    args: {
      celebrityId: { type: new GraphQLNonNull(GraphQLString) },
      typeId: { type: new GraphQLNonNull(GraphQLString) },
      hint: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, { celebrityId, typeId, hint }) {
      const celebrityHint = new CelebrityHintModel({
        celebId: celebrityId,
        typeId: typeId,
        hint: hint,
      });

      return celebrityHint.save();
    }
  }
}

import { model, Schema } from 'mongoose';

const celebrityTypeSchema = new Schema({
  name: String,
});

const CelebrityTypeModel = model('CelebrityType', celebrityTypeSchema);
export { CelebrityTypeModel };

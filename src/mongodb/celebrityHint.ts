import { model, Schema } from 'mongoose';

const celebritySchema = new Schema({
  name: String,
  image: String,
});

const celebrityHintSchema = new Schema({
  hint: String,
  celebId: String,
  typeId: String,
});

const CelebrityModel = model('Celebrity', celebritySchema);
const CelebrityHintModel = model('CelebrityHint', celebrityHintSchema);

export { CelebrityModel, CelebrityHintModel };

import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const topicSchema = new Schema({
  name: { type: String, required: true },
  topic_arn: { type: String, required: true },
  app: { type: ObjectId, ref: 'App' },
});

module.exports = mongoose.model('Topic', topicSchema);

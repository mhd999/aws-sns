import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema({
  app_id: { type: String, required: true },
  included_segments: { type: [String], required: true },
  data: String,
  contents: String,
});

module.exports = mongoose.model('Notification', notificationSchema);

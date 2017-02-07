import mongoose, { Schema } from 'mongoose';

const appSchema = new Schema({
  name: { type: String, required: true },
  platform_application_arn: { type: String, required: true },
  request_id: { type: String, required: true },
  basic_auth_key: { type: String, required: false },
  apns_env: String,
  apns_p12: String,
  apns_p12_password: String,
  gcm_key: String,
  android_gcm_sender_id: String,
});

module.exports = mongoose.model('App', appSchema);

import mongoose, { Schema } from 'mongoose';

export const ConcactMessagesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.models.contactMessages ||
  mongoose.model('contactMessages', ConcactMessagesSchema);

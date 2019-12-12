import mongoose, { Schema } from 'mongoose';

const RegistrationSchema = new Schema(
  {
    charge: {
      type: String,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
      trim: true,
    },
    sessions: {
      type: [String],
    },
    notes: {
      type: String,
    },
    liabilityAgreement: {
      type: Boolean,
      required: true,
      default: true,
    },
    camper: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.models.registration ||
  mongoose.model('registration', RegistrationSchema);

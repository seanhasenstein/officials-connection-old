import mongoose, { Schema } from 'mongoose';

const CamperSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street1: {
        type: String,
        required: true,
        trim: true,
      },
      street2: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      zipcode: {
        type: String,
        required: true,
        trim: true,
      },
    },
    wiaaNumber: {
      type: String,
      trim: true,
    },
    wiaaClassification: {
      type: String,
      trim: true,
    },
    foodAllergies: {
      type: String,
      default: '',
      trim: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },
    notes: {
      type: String,
      trim: true,
    },
    registrations: {
      type: [String],
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    resetToken: {
      type: String,
      trim: true,
      default: null,
    },
    resetTokenExpiry: {
      type: Number,
      trim: true,
      default: null,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.models.camper || mongoose.model('camper', CamperSchema);

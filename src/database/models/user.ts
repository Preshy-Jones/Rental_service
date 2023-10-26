import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: nanoid,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
      },
      password: {
        type: String,
        minLength: 8,
        default: null,
      },
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const carFeatureSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },

  feature_id: {
    type: Number,
    required: true,
  },
  installedUpgrades: {
    type: Boolean,
    required: true,
  },
});

const CarFeature = mongoose.model("CarFeature", carFeatureSchema);

export default CarFeature;

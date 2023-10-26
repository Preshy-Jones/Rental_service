import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const featureSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "comfort",
      "entertainment",
      "tech",
      "interior",
      "exterior-and-mechanical",
      "mechanical",
    ],
  },
  // packageName: {
  //   type: String,
  //   required: true,
  // },
});

featureSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});
const Feature = mongoose.model("Feature", featureSchema);

export default Feature;

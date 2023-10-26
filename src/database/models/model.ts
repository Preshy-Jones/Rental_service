import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const modelSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  make_id: {
    type: String,
    ref: "Make",
  },
});

modelSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const Model = mongoose.model("Model", modelSchema);

export default Model;

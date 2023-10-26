import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const packageSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

packageSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const Package = mongoose.model("Package", packageSchema);

export default Package;

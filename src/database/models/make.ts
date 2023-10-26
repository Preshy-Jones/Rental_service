import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const makeSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

makeSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const Make = mongoose.model("Make", makeSchema);
export default Make;

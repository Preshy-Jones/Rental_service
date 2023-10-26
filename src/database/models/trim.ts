import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";
const { Schema } = mongoose;

const trimSchema = new Schema(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

trimSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const Trim = mongoose.model("Trim", trimSchema);

export default Trim;

import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const bodyTypeSchema = new Schema(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bodyTypeSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const BodyType = mongoose.model("BodyType", bodyTypeSchema);

export default BodyType;

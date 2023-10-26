import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const driveTypeSchema = new Schema(
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

driveTypeSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const DriveType = mongoose.model("DriveType", driveTypeSchema);

export default DriveType;

import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";

const { Schema } = mongoose;

const FuelTypeSchema = new Schema(
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

FuelTypeSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const FuelType = mongoose.model("FuelType", FuelTypeSchema);

export default FuelType;

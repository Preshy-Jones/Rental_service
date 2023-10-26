import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";
const { Schema } = mongoose;

const transmissionSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["manual", "automatic", "cvt"],
  },
});

transmissionSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});
const Transmission = mongoose.model("Transmission", transmissionSchema);

export default Transmission;

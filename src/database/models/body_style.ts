import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const bodyStyleSchema = new Schema(
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


bodyStyleSchema.pre("validate", function (next) {
  this._id = slugify(this.title, { lower: true, strict: true });
  next();
});

const BodyStyle = mongoose.model("BodyStyle", bodyStyleSchema);

export default BodyStyle;

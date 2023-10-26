import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;


const imageSchema = new Schema({
  _id: {
    type: String,
    default: nanoid,
  },
  title: {
    type: String,
  },
  url:{
    type: String,
    required: true,
  }
});




const Image = mongoose.model("Image", imageSchema);

export default Image;
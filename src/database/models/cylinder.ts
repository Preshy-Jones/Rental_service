import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;


const cylinderSchema = new Schema({
  _id: {
    type: String,
    default: nanoid,
  },
  name: {
    type: String,
    required: true,
  }
});

const Cylinder = mongoose.model("Cylinder", cylinderSchema);

export default Cylinder;
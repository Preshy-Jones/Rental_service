import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const proConSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const reviewSchema = new Schema(
  {
    _id: {
      type: String,
      default: nanoid,
    },
    title: {
      type: String,
      required: true,
    },
    wouldRecommend: {
      type: Boolean,
      required: true,
    },
    whyRecommend: {
      type: String,
    },
    pros: [proConSchema],
    cons: [proConSchema],
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },

    carUsedForTranssport:{
      type: Boolean,
      required: true,
    },
    howManyPeopleInCarTransport: {
      type: Number,
    },
    heightFeet:{
      type: Number,
      required: true,
    },
    heightInches:{
      type: Number,
      required: true,
    },
    model_id: {
      type: String,
    },
    make_id: {
      type: String,
    },
    current_mileage: {
      type: Number,
    },
    year: {
      type: Number,
    },
    length_of_ownership: {
      type: Number,
    },
    body: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;

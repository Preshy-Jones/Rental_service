import BodyType from "../database/models/body_type";
import Car from "../database/models/car";
import Make from "../database/models/make";
import Model from "../database/models/model";

const getCars = async (params: {
  model?: string | string[];
  make?: string | string[];
  body_type?: string | string[];
  limit?: string;
}) => {
  let { model, make, body_type, limit } = params;

  console.log(make, model);
  let modelPayload: any;
  let makePayload: any;
  let bodyTypePayload: any;

  modelPayload = model;
  makePayload = make;
  bodyTypePayload = body_type;

  let limitPayload;
  if (limit === "all") {
    limitPayload = undefined;
  } else {
    limitPayload = limit;
  }
  let filter = {
    makes: make,
    models: model,
    body_types: body_type,
    limit: limit,
    displayedCount: limit,
  };

  if (!modelPayload) {
    modelPayload = await Model.find().distinct("slug");
    // console.log(modelPayload);
  }
  if (!makePayload) {
    makePayload = await Make.find().distinct("slug");
  }

  if (!bodyTypePayload) {
    bodyTypePayload = await BodyType.find().distinct("slug");
  }

  if (typeof makePayload === "string") {
    makePayload = [makePayload];
    filter.makes = [makePayload];
  }
  if (typeof modelPayload === "string") {
    modelPayload = [modelPayload];
    filter.models = [modelPayload];
  }



  const cars = await Car.aggregate([
    {
      $lookup: {
        from: "makes",
        localField: "make_id",
        foreignField: "_id",
        as: "make",
      },
    },
    { $unwind: "$make" },

    {
      $match: {
        "make.slug": { $in: makePayload },
      },
    },

    //if model is not empty then match the model
    {
      $lookup: {
        from: "models",
        localField: "model_id",
        foreignField: "_id",
        as: "model",
      },
    },
    { $unwind: "$model" },
    {
      $match: {
        "model.slug": { $in: modelPayload },
      },
    },




    //add field equal to the count of the results
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        cars: { $push: "$$ROOT" },
      },
    },
    //if limit params is specified then limit the result to that number, if not then return all

    {
      $project: {
        _id: 0,
        count: 1,
        cars: {
          $slice: ["$cars", limitPayload ? parseInt(limitPayload) : 1000000],
        },
      },
    },
  ]);

  if (
    limit === "all" ||
    Number(filter.limit) >= cars[0].count ||
    limit === undefined
  ) {
    filter.displayedCount = cars[0].count;
  }

  return { results: cars[0], filter };
};

export default getCars;
import Model from "../database/models/model";

const getModels = async (make: any) => {
  // let filter: Record<string, any> = {};
  // filter = make ? { make_id: make } : {};
  // const models = await Model.find(filter).populate("make_id");

  let makePayload: any;

  makePayload = make;

  if (typeof makePayload === "string") {
    makePayload = [makePayload];
  }
  let models;
  if (make) {
    models = await Model.aggregate([
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
      //group by make._id and seperate by the slug of the make
      {
        $group: {
          _id: "$make._id",
          make_name: { $first: "$make.title" },
          models: {
            $push: {
              _id: "$_id",
              title: "$title",
              slug: "$slug",
            },
          },
        },
      },
    ]);
  } else {
    models = await Model.find({});
  }
  return models;
};

export default getModels;

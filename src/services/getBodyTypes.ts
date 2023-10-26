import BodyType from "../database/models/body_type";
import Make from "../database/models/make";

const getBodyTypes = async (params: { make_slugs: string | string[] }) => {
  //if make_id is not provided, return all body types

  let make_slugs = params.make_slugs;

  if (!make_slugs) {
    //return all body types exlcuding the make_slugs field
    return BodyType.find({}, { make_slugs: 0 });
  }

  if (typeof make_slugs === "string") {
    make_slugs = [make_slugs];
  }

  //convert the make_slugs array to an array of make_ids using the Make model

  const make_ids = await Make.find({ slug: { $in: make_slugs } }).distinct(
    "_id"
  );


  const bodyTypes = BodyType.aggregate([
    {
      $match: {
        make_ids: {
          $in: make_ids,
        },
      },
    },

    {
      $lookup: {
        from: "makes",
        localField: "make_ids",
        foreignField: "_id",
        as: "makes",
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        title: 1,
      },
    },
  ]);
  return bodyTypes;
};

export default getBodyTypes;

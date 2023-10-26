import BodyType from "../database/models/body_type";
import Make from "../database/models/make";

const seedMakesToBodyType = async (bodyTypeMakeData: any) => {
  console.log(bodyTypeMakeData);
  
  for (let i = 0; i < bodyTypeMakeData.length; i++) {
    let bodyTypeSlug = bodyTypeMakeData[i].body_type_slug;
    let makeSlugs = bodyTypeMakeData[i].make_slugs;
    console.log(makeSlugs);

    //find all the make ids that match the makeSlugs and add them to the body type

    const makeIds = await Make.aggregate([
      {
        $match: {
          slug: {
            $in: makeSlugs,
          },
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const makeIdsArray = makeIds.map((makeId) => makeId._id);

    await BodyType.findOneAndUpdate(
      { slug: bodyTypeSlug },

      { $push: { make_ids: { $each: makeIdsArray } } },
      { new: true }
    );
  }
};

export default seedMakesToBodyType;

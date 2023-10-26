import { Request, Response, NextFunction } from "express";
import BodyType from "../../database/models/body_type";
import Make from "../../database/models/make";
import { makeBodyTypeData } from "../../database/seeders/body_types.seeder";
import makesData from "../../database/seeders/makes.seeder";
import { successResponse } from "../../utils";

export const getMakesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const makes = await Make.find();
    return res.send(successResponse("Makes retrieved successfully", makes));
  } catch (error) {
    next(error);
  }
};

export const seedMakesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const makes = await Make.insertMany(makesData);
    res.status(201).json(makes);
  } catch (error) {
    next(error);
  }
};

export const seedBodyTypesToMakeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    for (let i = 0; i < makeBodyTypeData.length; i++) {
      let makeSlug = makeBodyTypeData[i].slug;

      let bodyTypeSlugs = makeBodyTypeData[i].body_type_slugs;

      //find all the body type ids that match the body type slugs and add them to the make

      const bodyTypeIds = await BodyType.aggregate([
        {
          $match: {
            slug: {
              $in: bodyTypeSlugs,
            },
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ]);

      const bodyTypeIdsArray = bodyTypeIds.map((bodyType) => bodyType._id);

      const make = await Make.findOneAndUpdate(
        { slug: makeSlug },

        {
          $set: {
            body_type_ids: bodyTypeIdsArray,
          },
        },
        { new: true }
      );
    }

    res.send(successResponse("Body types added to makes successfully", null));
  } catch (error) {
    next(error);
  }
};

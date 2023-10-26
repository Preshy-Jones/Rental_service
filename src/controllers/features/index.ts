import { NextFunction, Request, Response } from "express";
import Feature from "../../database/models/feature";
import categorizedFeatures from "../../database/seeders/feature.seeder";
import featurePayLoad from "../../database/seeders/feature.seeder";
import { successResponse } from "../../utils";

export const getFeaturesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const features = await Feature.find({});
    res.status(200).json(features);
  } catch (error) {
    next(error);
  }
};

export const seedFeaturesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // return res.send(categorizedFeatures);
    const features = await Feature.insertMany(categorizedFeatures);
    return res.send(successResponse("Features seeded successfully", features))
  } catch (error) {
    next(error);
  }
};

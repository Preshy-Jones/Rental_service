import Series from "../../database/models/series";
import seriesData from "../../database/seeders/series.seeder";
import { successResponse } from "../../utils";
import { NextFunction, Request, Response } from "express";

export const getSeriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await Series.find({});
    return res.send(
      successResponse("Series retrieved successfully", packages)
    );
  } catch (err) {
    next(err);
  }
};

export const seedSeriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await Series.insertMany(seriesData);
    return res.send(
      successResponse("Series seeded successfully", packages)
    );
  } catch (err) {
    next(err);
  }
};

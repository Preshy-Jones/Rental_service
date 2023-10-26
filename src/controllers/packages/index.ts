import { successResponse } from "../../utils";
import { NextFunction, Request, Response } from "express";
import driveTypeData from "../../database/seeders/drive_type.seeder";
import Package from "../../database/models/package";
import packagesData from "../../database/seeders/package.seeder";

export const getPackagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await Package.find({});
    return res.send(
      successResponse("Packages retrieved successfully", packages)
    );
  } catch (err) {
    next(err);
  }
};

export const seedPackagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await Package.insertMany(packagesData);
    return res.send(
      successResponse("Packages seeded successfully", packages)
    );
  } catch (err) {
    next(err);
  }
};

import DriveType from "../../database/models/drive_type";
import { successResponse } from "../../utils";
import { NextFunction, Request, Response } from "express";
import driveTypeData from "../../database/seeders/drive_type.seeder";

export const getDriveTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driveTypes = await DriveType.find({});
    return res.send(
      successResponse("Drive Types retrieved successfully", driveTypes)
    );
  } catch (err) {
    next(err);
  }
};

export const seedDriveTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driveTypes = await DriveType.insertMany(driveTypeData);
    return res.send(
      successResponse("Drive Types seeded successfully", driveTypes)
    );
  } catch (err) {
    next(err);
  }
};

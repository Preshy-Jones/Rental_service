import { NextFunction, Request, Response } from "express";
import Transmission from "../../database/models/transmission";
import transmissionsData from "../../database/seeders/transmission.seeder";
import { successResponse } from "../../utils";

export const getTranmissionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transmissions = await Transmission.find();
    return res.send(
      successResponse("Transmissions retrieved successfully", transmissions)
    );
  } catch (err) {
    next(err);
  }
};

export const seedTranmissionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transmissions = await Transmission.insertMany(transmissionsData);
    return res.send(
      successResponse("Transmissions seeded successfully", transmissions)
    );
  } catch (err) {
    next(err);
  }
};

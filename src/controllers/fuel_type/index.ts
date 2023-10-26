import { NextFunction, Request, Response } from "express";
import FuelType from "../../database/models/fuel_type";
import { fuelTypesData } from "../../database/seeders/fuel_types.seeder";
import { successResponse } from "../../utils";
import { AuthenticationError } from "../../errors";

export const getFuelTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fuelTypes = await FuelType.find();
    throw new AuthenticationError("Invalid credentials");
    // return res.send(
    //   successResponse("Fuel types retrieved successfully", fuelTypes)
    // );
  } catch (err) {
    next(err);
  }
};

export const seedFuelTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fuelTypes = await FuelType.insertMany(fuelTypesData);
    res.status(201).json(fuelTypes);
  } catch (error) {
    next(error);
  }
};

export const seedMakeToFuelTypeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fuelTypes = await FuelType.insertMany(fuelTypesData);
    res.status(201).json(fuelTypes);
  } catch (error) {
    next(error);
  }
};

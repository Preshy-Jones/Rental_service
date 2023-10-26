import { Request, Response, NextFunction } from "express";
import Car from "../../database/models/car";
import Make from "../../database/models/make";
import Model from "../../database/models/model";
import Package from "../../database/models/package";
import Trim from "../../database/models/trim";
import makesData from "../../database/seeders/makes.seeder";
import modelsData from "../../database/seeders/model.seeder";
import trimsData from "../../database/seeders/trims.seeder";
import { getCars, getCars2, getFilterOptions, getModels } from "../../services";
import getCarService from "../../services/getCar";
import seedCars from "../../services/seedCars";
import { successResponse } from "../../utils";
import { faker } from "@faker-js/faker";
import { FilterOptionsInterface } from "../../types";
import { ServiceError } from "../../errors";

export const getSingleCarHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await getCarService(req.params.id);
    return res.send(successResponse("Car retrieved successfully", car));
  } catch (err) {
    next(err);
  }
};

export const getCarsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { model, make, body_type, limit } = req.query as {
    model?: string[];
    make?: string[];
    body_type?: string[];
    limit?: string;
  };

  try {
    const cars = await getCars({
      model,
      make,
      body_type,
      limit,
    });
    return res.send(successResponse("Cars retrieved successfully", cars));
  } catch (error) {
    next(error);
  }
};

export const getCarsHandler2 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, filters } = req.body;
  try {
    const cars = await getCars2({
      page,
      perPage,
      filters,
    });

    return res.send(successResponse("Cars retrieved successfully", cars));
  } catch (error) {
    next(error);
  }
};

export const getFilterOptionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { group_by, filters } = req.body as { group_by: string; filters: any };

  try {
    const filterOptions = await getFilterOptions({
      group_by,
      filters,
    });
    return res.send(
      successResponse("Cars retrieved successfully", filterOptions)
    );
  } catch (error) {
    next(error);
  }
};

export const seedCarsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await seedCars();
    return res.send(successResponse("Cars seeded successfully", results));
  } catch (error) {
    next(error);
  }
};

export const createMakeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const make = await Make.create(req.body);
    res.status(201).json(make);
  } catch (err) {
    next(err);
  }
};

export const createTrimHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trim = await Trim.create(req.body);
    res.status(201).json(trim);
  } catch (err) {
    next(err);
  }
};

export const seedTrimsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trims = await Trim.insertMany(trimsData);
    res.status(201).json(trims);
  } catch (error) {
    next(error);
  }
};

export const createPackageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carPackage = await Package.create(req.body);
    res.status(201).json(carPackage);
  } catch (err) {
    next(err);
  }
};

// export const seedPackagesHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const packages = await Package.insertMany(packagesData);
//     res.status(201).json(packages);
//   } catch (error) {
//     next(error);
//   }
// };

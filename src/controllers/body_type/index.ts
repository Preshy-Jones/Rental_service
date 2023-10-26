import { NextFunction, Request, Response } from "express";
import BodyType from "../../database/models/body_type";
import Make from "../../database/models/make";
import {
  bodyTypeMakeData,
  bodyTypesData,
} from "../../database/seeders/body_types.seeder";
import getBodyTypes from "../../services/getBodyTypes";
import seedMakesToBodyType from "../../services/seedMakesToBodyType";
import { successResponse } from "../../utils";

export const getBodyTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { make } = req.query as { make: string | string[] };
    const bodyTypes = await getBodyTypes({ make_slugs: make });
    return res.send(
      successResponse("Body types retrieved successfully", bodyTypes)
    );
  } catch (err) {
    next(err);
  }
};

export const seedBodyTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyTypes = await BodyType.insertMany(bodyTypesData);
    return res.status(201).json(bodyTypes);
  } catch (error) {
    next(error);
  }
};

export const addMakeToBodyTypeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await seedMakesToBodyType(bodyTypeMakeData);
    return res.send(successResponse("Body types updated successfully", null));
  } catch (error) {
    next(error);
  }
};

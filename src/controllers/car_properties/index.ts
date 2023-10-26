import BodyStyle from "../../database/models/body_style";
import Trim from "../../database/models/trim";
import bodyStylesData from "../../database/seeders/body_styles.seeder";
import trimsData from "../../database/seeders/trims.seeder";
import { successResponse } from "../../utils";
import { NextFunction, Request, Response } from "express";

export const getBodyStylesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyStyles = await BodyStyle.find({});
    return res.send(
      successResponse("Body Styles retrieved successfully", bodyStyles)
    );
  } catch (err) {
    next(err);
  }
};

export const seedBodyStylesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyStyles = await BodyStyle.insertMany(bodyStylesData);
    return res.send(
      successResponse("Body Styles seeded successfully", bodyStyles)
    );
  } catch (err) {
    next(err);
  }
};

export const getTrimsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trims = await Trim.find({});
    return res.send(successResponse("Trims retrieved successfully", trims));
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
    // return res.send(successResponse("Trims seeded successfully", trimsData));
    const trims = await Trim.insertMany(trimsData);
    return res.send(successResponse("Trims seeded successfully", trims));
  } catch (err) {
    next(err);
  }
};

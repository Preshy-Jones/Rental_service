import { Request, Response, NextFunction } from "express";
import modelsData from "../../database/seeders/model.seeder";
import { getModels } from "../../services";
import { successResponse } from "../../utils";
import Model from "../../database/models/model";

export const getModelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { make } = req.query;

  try {
    const models = await getModels(make);
    return res.send(successResponse("Models retrieved successfully", models));
  } catch (error) {
    next(error);
  }
};

export const getModelsBySlugHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { make, models } = req.body;
    //find all models whose make slug is equal to slug
    const modelsQuery = await Model.aggregate([
      {
        $lookup: {
          from: "makes",
          localField: "make_id",
          foreignField: "_id",
          as: "make",
        },
      },
      {
        $unwind: "$make",
      },
      {
        $match: {
          "make.slug": make,
        },
      },
      //return array of all the model slugs
      {
        $project: {
          slug: 1,
        },
      },
    ]);

    //filter the models array and leave only models not in the array of modelsQuery.slug
    const filteredModels = models.filter(
      (model: any) => !modelsQuery.map((m) => m.slug).includes(model)
    );

    return res.send(
      successResponse("Models retrieved successfully", filteredModels)
    );
  } catch (err) {}
};

export const createModelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const model = await Model.create(req.body);
    res.status(201).json(model);
  } catch (err) {
    next(err);
  }
};

export const updateModelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const models = await Model.find();

    models.forEach(async (model) => {
      const newModel = await Model.findByIdAndUpdate(model._id, {
        slug: model.title.toLowerCase(),
      });
    });

    return res.status(201).json("success");
  } catch (err) {
    next(err);
  }
};

export const seedModelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //return res.send(modelsData)
    const models = await Model.insertMany(modelsData);
    res.status(201).json(models);
  } catch (error) {
    next(error);
  }
};

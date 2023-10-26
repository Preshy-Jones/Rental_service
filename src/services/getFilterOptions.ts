import Car from "../database/models/car";
import { FilterOptionsInterface } from "../types";

const makeFilterConditions = (params: FilterOptionsInterface) => {
  const ands = [];

  if (params.make?.length) ands.push({ make_id: { $in: params.make } });
  if (params.model?.length) ands.push({ model_id: { $in: params.model } });
  if (params.body_type?.length)
    ands.push({ body_type_id: { $in: params.body_type } });
  if (params.body_style?.length)
    ands.push({ body_style_id: { $in: params.body_style } });
  if (params.fuel_type?.length)
    ands.push({ fuel_type_id: { $in: params.fuel_type } });
  if (params.year_from && params.year_to)
    ands.push(
      { year: { $lte: params.year_to } },
      { year: { $gte: params.year_from } }
    );
  if (params.price_from && params.price_to)
    ands.push(
      { price: { $lte: params.price_to } },
      { price: { $gte: params.price_from } }
    );
  if (params.milleage)
    ands.push({ "milleage.value": { $lte: params.milleage } });
  if (params.features?.length)
    ands.push({ "carFeatures.feature_id": { $in: params.features } });
  if (params.transmission?.length)
    ands.push({ transmission: { $in: params.transmission } });
  if (params.exterior_color?.length)
    ands.push({ exterior_color: { $in: params.exterior_color } });
  if (params.interior_color?.length)
    ands.push({ interior_color: { $in: params.interior_color } });
  if (params.trim?.length) ands.push({ trim_id: { $in: params.trim } });
  if (params.series?.length) ands.push({ series_id: { $in: params.series } });
  if (params.packages?.length)
    ands.push({ packages_id: { $in: params.packages } });

  return ands;
};

const getFilterOptions = async (params: {
  group_by: string;
  filters: FilterOptionsInterface;
}) => {
  // const exclusions: {[key: string]: string[]} = { make: ["model"] };

  // if (Object.keys(exclusions).includes(params.group_by)) {
  //   exclusions[params.group_by].forEach(key => {
  //     params.filters[key] = undefined;
  //   });
  // }

  if (params.group_by === "make_id") {
    params.filters.model = undefined;
    params.filters.trim = undefined;
    params.filters.series = undefined;
    params.filters.packages = undefined;
  }

  const ands = makeFilterConditions(params.filters);

  let pipeline = [];

  if (ands.length > 0) {
    pipeline.push({ $match: { $and: ands } });
  }

  if (params.group_by === "features") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "features",
          localField: "carFeatures.feature_id",
          foreignField: "_id",
          as: "features",
        },
      },
      {
        $unwind: "$features",
      },
      { $group: { _id: `$${params.group_by}`, count: { $sum: 1 } } },
      { $project: { _id: "$_id._id", feature: "$_id", count: 1 } },
      {
        $sort: { "feature.title": 1 as 1 },
      },
    ];
  } else {
    pipeline = [
      ...pipeline,
      { $group: { _id: `$${params.group_by}`, count: { $sum: 1 } } },
    ];
  }

  if (params.group_by === "make_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "makes",
          localField: "_id",
          foreignField: "_id",
          as: "make",
        },
      },
      { $unwind: "$make" },
      {
        $sort: { "make.title": 1 as 1 },
      },
    ];
  }

  if (params.group_by === "model_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "models",
          localField: "_id",
          foreignField: "_id",
          as: "model",
        },
      },
      { $unwind: "$model" },
      {
        $lookup: {
          from: "makes",
          localField: "model.make_id",
          foreignField: "_id",
          as: "make",
        },
      },
      { $unwind: "$make" },
      // {$project: { _id: 1, make_id: "$make_id", count: 1 } },
    ];
  }

  if (params.group_by == "transmission_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "transmissions",
          localField: "_id",
          foreignField: "_id",
          as: "transmission",
        },
      },
      {
        $unwind: "$transmission",
      },
      {
        $sort: { "transmission.title": 1 as 1 },
      },
    ];
  }

  if (params.group_by == "series_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "series",
          localField: "_id",
          foreignField: "_id",
          as: "series",
        },
      },
      {
        $unwind: "$series",
      },
      {
        $sort: { "sseries.title": 1 as 1 },
      },
    ];
  }

  if (params.group_by == "year") {
    pipeline = [
      ...pipeline,
      {
        $sort: { _id: -1 as -1 },
      },
    ];
  }

  if (params.group_by === "drive_type_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "drivetypes",
          localField: "_id",
          foreignField: "_id",
          as: "drive_type",
        },
      },
      {
        $unwind: "$drive_type",
      },
      {
        $sort: { "drive_type.title": 1 as 1 },
      },
    ];
  }

  if (
    params.group_by === "exterior_color" ||
    params.group_by === "interior_color"
  ) {
    pipeline = [
      ...pipeline,
      {
        $sort: { _id: 1 as 1 },
      },
    ];
  }

  if (params.group_by === "body_style_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "bodystyles",
          localField: "_id",
          foreignField: "_id",
          as: "body_style",
        },
      },
      { $unwind: "$body_style" },
      {
        $sort: { "body_style.title": 1 as 1 },
      },
    ];
  }
  if (params.group_by === "fuel_type_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "fueltypes",
          localField: "_id",
          foreignField: "_id",
          as: "fuel_type",
        },
      },
      { $unwind: "$fuel_type" },
      {
        $sort: { "fuel_type.title": 1 as 1 },
      },
    ];
  }
  if (params.group_by === "body_type_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "bodytypes",
          localField: "_id",
          foreignField: "_id",
          as: "body_type",
        },
      },
      { $unwind: "$body_type" },
      {
        $sort: { "body_type.title": 1 as 1 },
      },
    ];
  }
  if (params.group_by === "trim_id") {
    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: "trims",
          localField: "_id",
          foreignField: "_id",
          as: "trim",
        },
      },
      { $unwind: "$trim" },
      {
        $sort: { "trim.title": 1 as 1 },
      },
    ];
  }

  const results = await Car.aggregate(pipeline).allowDiskUse(true);
  if (params.group_by === "model_id") {
  }
  return results;
};

const getFilterOptionsHandler = async (params: {
  group_by: string;
  filters: any;
}) => {
  console.log(params);

  return getFilterOptions(params);
};

export default getFilterOptionsHandler;

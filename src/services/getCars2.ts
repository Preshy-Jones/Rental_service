import Car from "../database/models/car";
import { FilterOptionsInterface } from "../types";

interface GetCarsParamsInterface extends FilterOptionsInterface {
  page: number;
  perPage: number;
}

const makeFilterConditions = (params: FilterOptionsInterface) => {
  const ands = [];

  if (params.make?.length) ands.push({ make_id: { $in: params.make } });
  if (params.model?.length) ands.push({ model_id: { $in: params.model } });
  if (params.body_type?.length)
    ands.push({ body_type_id: { $in: params.body_type } });
  if (params.fuel_type?.length)
    ands.push({ fuel_type_id: { $in: params.fuel_type } });
  if (params.year_from) ands.push({ year: { $gte: Number(params.year_from) } });
  if (params.year_to) ands.push({ year: { $lte: Number(params.year_to) } });
  if (params.price_from)
    ands.push({ price: { $gte: Number(params.price_from) } });
  if (params.price_to) ands.push({ price: { $lte: Number(params.price_to) } });
  if (params.milleage)
    ands.push({ "milleage.value": { $lte: params.milleage } });
  if (params.features?.length)
    ands.push({ "carFeatures.feature_id": { $in: params.features } });
  if (params.transmission?.length)
    ands.push({ transmission_id: { $in: params.transmission } });
  if (params.exterior_color?.length)
    ands.push({ exterior_color: { $in: params.exterior_color } });
  if (params.interior_color?.length)
    ands.push({ interior_color: { $in: params.interior_color } });
  if (params.trim?.length) ands.push({ trim_id: { $in: params.trim } });
  if (params.series?.length) ands.push({ series_id: { $in: params.series } });
  if (params.packages?.length)
    ands.push({ packages_id: { $in: params.packages } });
  if (params.vehicle_condition?.length)
    ands.push({ vehicle_condition: { $in: params.vehicle_condition } });

  return ands;
};

const newGetCars = async (params: GetCarsParamsInterface) => {
  const ands = makeFilterConditions(params);

  const match = { $and: ands };
  const offset = params.perPage * (params.page - 1);

  const results = [{ $skip: offset }, { $limit: params.perPage }];

  let pipeline = [];

  if (ands.length > 0) {
    pipeline.push({ $match: match });
  }
  pipeline = [
    ...pipeline,
    {
      $facet: {
        results,
        pageInfo: [
          { $group: { _id: null, count: { $sum: 1 } } },
          {
            $addFields: {
              limit: params.perPage,
            },
          },
        ],
      },
    },
  ];

  const carResults = await Car.aggregate(pipeline).allowDiskUse(true);
  return carResults;
};
const getCars2 = async (params: {
  page: number;
  perPage: number;
  filters: any;
}) => {

  const payload = {
    ...params.filters,
    page: Number(params.page),
    perPage: Number(params.perPage),
  };
  const cars = await newGetCars(payload);

  return {
    cars,
  };
};

export default getCars2;

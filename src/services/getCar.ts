import Car from "../database/models/car";

const getCarService = async (id: string) => {
  //get car and populate make_id and model_id fields
  const car = await Car.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "makes",
        localField: "make_id",
        foreignField: "_id",
        as: "make",
      },
    },
    {
      $lookup: {
        from: "models",
        localField: "model_id",
        foreignField: "_id",
        as: "model",
      },
    },
    {
      $unwind: "$make",
    },
    {
      $unwind: "$model",
    },

    {
      $lookup: {
        from: "bodytypes",
        localField: "body_type_id",
        foreignField: "_id",
        as: "body_type",
      },
    },
    { $unwind: "$body_type" },

    {
      $lookup: {
        from: "transmissions",
        localField: "transmission_id",
        foreignField: "_id",
        as: "transmission",
      },
    },
    {
      $unwind: "$transmission",
    },

    //populate drive_type_id
    {
      $lookup: {
        from: "drivetypes",
        localField: "drive_type_id",
        foreignField: "_id",
        as: "drive_type",
      },
    },
    {
      $unwind: "$drive_type",
    },

    //populate feature_id field in carFeatures array fields and group by the category in the feature field
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

    {
      $group: {
        _id: "$_id",
        make: { $first: "$make" },
        model: { $first: "$model" },
        year: { $first: "$year" },
        registration: { $first: "$registration" },
        number_of_keys: { $first: "$number_of_keys" },
        drive_type: { $first: "$drive_type" },
        price: { $first: "$price" },
        mileage: { $first: "$mileage" },
        body_type: { $first: "$body_type" },
        transmission: { $first: "$transmission" },
        fuel_type: { $first: "$fuel_type" },
        engine: { $first: "$engine" },
        interior_color: { $first: "$interior_color" },
        seats: { $first: "$seats" },
        previous_owners: { $first: "$previous_owners" },
        exterior_color: { $first: "$exterior_color" },
        description: { $first: "$description" },
        images: { $first: "$images" },
        performance: { $first: "$performance" },
        measurement: { $first: "$measurement" },
        media: { $first: "$media" },
        carFeatures: {
          $push: {
            feature: "$features",
            installedUpgrade: "$carFeatures.installedUpgrade",
          },
        },
      },
    },

    {
      $project: {
        make: 1,
        model: 1,
        year: 1,
        registration: 1,
        price: 1,
        mileage: 1,
        body_type: 1,
        transmission: 1,
        fuel_type: 1,
        engine: 1,
        description: 1,
        images: 1,
        number_of_keys: 1,
        drive_type: 1,
        interior_color: 1,
        seats: 1,
        previous_owners: 1,
        exterior_color: 1,
        performance: 1,
        measurement: 1,
        media: 1,
        carFeatures: {
          $map: {
            input: "$carFeatures",
            as: "carFeature",
            in: {
              feature: "$$carFeature.feature",
              installedUpgrade: {
                $arrayElemAt: [
                  "$$carFeature.installedUpgrade",
                  {
                    $indexOfArray: [
                      "$carFeatures.feature",
                      "$$carFeature.feature",
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);

  return car[0];
};

export default getCarService;

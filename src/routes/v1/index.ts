import express from "express";
const router = express.Router();

router.use("/cars", require("./car"));
router.use("/fuel_type", require("./fuel_type"));
router.use("/body_type", require("./body_type"));
router.use("/features", require("./features"));
router.use("/make", require("./make"));
router.use("/model", require("./model"));
router.use("/transmission", require("./transmission"));
router.use("/properties", require("./car_properties"));

module.exports = router;


// import BodyType from "../database/models/body_type";
// import Make from "../database/models/make";

// const getBodyTypes = async ({ make_id }: { make_id: string }) => {
//   //if make_id is not provided, return all body types

//   if (!make_id) {
//     return BodyType.find({});
//   }

//   const body_types = await BodyType.aggregate([
//     {
//       $match: {
//         make_ids: {
//           $in: [make_id],
//         },
//       },
//     },

//     {
//       $lookup: {
//         from: "makes",
//         localField: "make_ids",
//         foreignField: "_id",
//         as: "makes",
//       },
//     },

//     {
//       $project: {
//         _id: 1,
//         name: 1,
//         slug: 1,
//         title: 1,y
//         makes: {
//           _id: 1,
//           name: 1,
//           slug: 1,
//         },
//       },
//     },
//   ]);

//   return body_types;
// };

// export default getBodyTypes;

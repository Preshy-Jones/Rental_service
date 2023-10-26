import express from "express";
import {
  createMakeHandler,
  createTrimHandler,
  getCarsHandler,
  getCarsHandler2,
  getFilterOptionsHandler,
  getSingleCarHandler,
  seedCarsHandler,
  seedTrimsHandler,
} from "../../../controllers/car";

const router = express.Router();

//CARS
router.get("/", getCarsHandler);

router.post("/filter", getCarsHandler2);
router.post("/filter/options", getFilterOptionsHandler);

router.get("/car/:id", getSingleCarHandler);

router.get("/seed", seedCarsHandler);



//series

// router.get("/series", getSeriesHandler);

// router.post("/series", createMakeHandler);

// router.get("/series/seed", seedSeriesHandler);

//TRIMS
router.post("/trims", createTrimHandler);

router.get("/trims/seed", seedTrimsHandler);

//Packages

module.exports = router;

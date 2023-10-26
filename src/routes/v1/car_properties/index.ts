import express from "express";
import {
  getDriveTypesHandler,
  seedDriveTypesHandler,
} from "../../../controllers/drive_type";
import {
  getPackagesHandler,
  seedPackagesHandler,
} from "../../../controllers/packages";
import {
  getSeriesHandler,
  seedSeriesHandler,
} from "../../../controllers/series";
import {
  getBodyStylesHandler,
  getTrimsHandler,
  seedBodyStylesHandler,
  seedTrimsHandler,
} from "../../../controllers/car_properties";
const router = express.Router();

router.get("/drive_types", getDriveTypesHandler);

router.get("/drive_types/seed", seedDriveTypesHandler);

router.get("/packages", getPackagesHandler);

router.get("/packages/seed", seedPackagesHandler);

router.get("/body_style", getBodyStylesHandler);

router.get("/body_style/seed", seedBodyStylesHandler);

router.get("/series", getSeriesHandler);

router.get("/series/seed", seedSeriesHandler);

router.get("/trims", getTrimsHandler);

router.get("/trims/seed", seedTrimsHandler);

module.exports = router;

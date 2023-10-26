import express from "express";
import { getFeaturesHandler, seedFeaturesHandler } from "../../../controllers/features";

const router = express.Router();

router.get("/", getFeaturesHandler);

router.get("/seed", seedFeaturesHandler);

module.exports = router;

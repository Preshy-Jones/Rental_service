import express from "express";
import { getFuelTypesHandler, seedFuelTypesHandler } from "../../../controllers/fuel_type";
const router = express.Router();

router.get("/", getFuelTypesHandler);

router.get("/seed", seedFuelTypesHandler);

module.exports = router;

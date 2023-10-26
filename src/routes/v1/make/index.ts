import express from "express";
import { createMakeHandler } from "../../../controllers/car";
import { seedBodyTypesToMakeHandler, getMakesHandler, seedMakesHandler } from "../../../controllers/make";
const router = express.Router();

//MAKES
router.get("/", getMakesHandler);

router.post("/", createMakeHandler);

router.get("/seed", seedMakesHandler);

router.get("/add_body_type", seedBodyTypesToMakeHandler);
module.exports = router;

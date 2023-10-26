import express from "express";
import {
  createModelHandler,
  getModelsBySlugHandler,
  getModelsHandler,
  seedModelsHandler,
  updateModelsHandler,
} from "../../../controllers/model";
const router = express.Router();
//MODELS

router.get("/", getModelsHandler);

router.post("/filter", getModelsBySlugHandler);

router.post("/", createModelHandler);

router.put("/", updateModelsHandler);

router.get("/seed", seedModelsHandler);
module.exports = router;

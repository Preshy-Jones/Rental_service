import express from "express";
import {
  addMakeToBodyTypeHandler,
  getBodyTypesHandler,
  seedBodyTypesHandler,
} from "../../../controllers/body_type";
const router = express.Router();

router.get("/", getBodyTypesHandler);

router.get("/seed/make", addMakeToBodyTypeHandler);

router.get("/seed", seedBodyTypesHandler);

module.exports = router;

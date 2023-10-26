import express from "express";
import {
  getTranmissionsHandler,
  seedTranmissionsHandler,
} from "../../../controllers/transmission";

const router = express.Router();

router.get("/", getTranmissionsHandler);

router.get("/seed", seedTranmissionsHandler);

module.exports = router;

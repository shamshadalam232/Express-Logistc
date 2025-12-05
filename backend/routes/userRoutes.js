import express from "express";
import  {checkApplicationStatus, getApplications} from "../controllers/applicationsController.js";
import { trackShipment, checkStatus } from "../controllers/shipmentController.js";
import { applyApplications } from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/apply", getApplications);
router.get("/track/:trackingId", trackShipment);
router.post("/check", checkStatus);
router.post("/apply", applyApplications);
router.post("/checkapplication", checkApplicationStatus)


export default router;

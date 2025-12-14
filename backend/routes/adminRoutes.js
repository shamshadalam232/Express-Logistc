import express from "express";
import { adminProtect } from "../middleware/adminProtect.js";
import { approveApplication } from "../controllers/applicationsController.js";
import { getAllShipments, addShipment, updateShipment, deleteShipment } from "../controllers/shipmentController.js";
import { getApplications, rejectApplication, deleteApplication} from "../controllers/applicationsController.js";
import  uploadPdf from "../middleware/uploadPdf.js";



const router = express.Router();

// All shipments
router.get("/shipments", adminProtect, getAllShipments);
router.post("/shipments", adminProtect, addShipment);
router.put("/shipments/:id", adminProtect, updateShipment);
router.delete("/shipments/:id", adminProtect, deleteShipment);

// All user applications
router.get("/applications", adminProtect, getApplications);
//router.patch("/applications/:id/approve", adminProtect, approveApplication);
router.patch("/applications/:id/reject", adminProtect, rejectApplication);
router.delete("/applications/:id",adminProtect, deleteApplication);

//pdf upload 

router.patch(
  "/applications/:id/approve",
  uploadPdf.single("pdf"),
   adminProtect, approveApplication,
);

export default router;

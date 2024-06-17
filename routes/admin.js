import express from "express";
import {
  createService,
  getService,
  updateService,
  deleteService,
  getServiceDetail,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/create-service", createService);
router.get("/get-service", getService);
router.get("/get-service-detail/:serviceId", getServiceDetail);
router.put("/update-service/:serviceId", updateService);
router.delete("/delete-service/:serviceId", deleteService);

export { router };

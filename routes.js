import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";

export const router = express.Router();

// ---------------- Dashboard ----------------
// List all stations for logged-in user
router.get("/dashboard", dashboardController.index);

// Add a new station
router.post("/dashboard/addstation", dashboardController.addStation);

// Delete a station
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);

// ---------------- Stations ----------------
// View a single station and its reports
router.get("/station/:id", stationController.index);

// Add a weather report to a station
router.post("/station/:id/addreport", stationController.addReport);

// Delete a report from a station
router.get("/station/:id/deletereport/:reportid", stationController.deleteReport);

// ---------------- About ----------------
router.get("/about", aboutController.index);

// ---------------- Accounts ----------------
// Home / Login page
router.get("/", accountsController.index);

// Login / Signup / Logout
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);

// Register and authenticate users
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

export default router;

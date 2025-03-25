import { Router } from "express";
import ProjectController from "../controllers/projectController";
import compression = require("compression");
import limiter from "../middleware/projectLimiter";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(limiter);
// Get listing
router.get("/", compression(),authenticateToken,  ProjectController.list);
// Create a new candidate
router.post("/", authenticateToken,  ProjectController.create);
// Update candidate
router.put("/:id", authenticateToken, ProjectController.update);
// Delete candidate
router.delete("/:id", authenticateToken, ProjectController.delete);

export default router;

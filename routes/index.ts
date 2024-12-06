import { Router } from "express";
import farmRoutes from "./farmRoutes";
import produtorRoutes from "./produtorRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/farms", farmRoutes);
router.use("/produtores", produtorRoutes);
router.use("/users", userRoutes);

export default router;

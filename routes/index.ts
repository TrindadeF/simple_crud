import { Router } from "express";
import farmRoutes from "./farmRoutes";
import produtorRoutes from "./produtorRoutes";

const router = Router();

router.use("/farms", farmRoutes);
router.use("/produtores", produtorRoutes);

export default router;

import { Router } from "express";
import {
  criarFazenda,
  listarFazendas,
  obterFazenda,
  atualizarFazenda,
  deletarFazenda,
} from "../controllers/farmController";

const router = Router();
router.post("/", criarFazenda);
router.get("/", listarFazendas);
router.get("/:id", obterFazenda);
router.put("/:id", atualizarFazenda);
router.delete("/:id", deletarFazenda);

export default router;

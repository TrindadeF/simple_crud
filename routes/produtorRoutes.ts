import { Router } from "express";
import {
  criarProdutor,
  listarProdutores,
  obterProdutor,
  atualizarProdutor,
  deletarProdutor,
} from "../controllers/produtorController";

const router = Router();
router.post("/", criarProdutor);
router.get("/", listarProdutores);
router.get("/:id", obterProdutor);
router.put("/:id", atualizarProdutor);
router.delete("/:id", deletarProdutor);

export default router;

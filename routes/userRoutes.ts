import { Router } from "express";
import {
  criarUsuario,
  listarUsuarios,
  obterUsuario,
  atualizarUsuario,
  deletarUsuario,
} from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { validateIdParam } from "../middlewares/validateIdParam";
import {
  criarUsuarioSchema,
  atualizarUsuarioSchema,
} from "../schemas/userSchema";

const router = Router();
router.post("/", validateSchema(criarUsuarioSchema), criarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", validateIdParam, obterUsuario);
router.put(
  "/:id",
  validateIdParam,
  validateSchema(atualizarUsuarioSchema),
  atualizarUsuario
);

router.delete("/:id", validateIdParam, deletarUsuario);

export default router;

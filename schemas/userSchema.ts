import Joi from "joi";

export const criarUsuarioSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O campo 'email' deve ser um endereço de e-mail válido.",
    "string.empty": "O campo 'email' é obrigatório.",
    "any.required": "O campo 'email' é obrigatório.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter pelo menos 6 caracteres.",
    "string.empty": "O campo 'password' é obrigatório.",
    "any.required": "O campo 'password' é obrigatório.",
  }),
});

export const atualizarUsuarioSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    "string.email": "O campo 'email' deve ser um endereço de e-mail válido.",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.min": "A senha deve ter pelo menos 6 caracteres.",
  }),
})
  .or("email", "password")
  .messages({
    "object.missing":
      "É necessário fornecer pelo menos um dos campos: 'email' ou 'password'.",
  });

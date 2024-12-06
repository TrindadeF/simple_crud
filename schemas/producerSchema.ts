import Joi from "joi";

export const criarProdutorSchema = Joi.object({
  cpf: Joi.string().length(11).required(),
  cnpj: Joi.string().length(14).optional(),
  name: Joi.string().max(255).required(),
});

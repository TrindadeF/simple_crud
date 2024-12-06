import Joi from "joi";

export const criarFazendaSchema = Joi.object({
  producerId: Joi.number().integer().required(),
  orderDate: Joi.date().required(),
  name: Joi.string().max(255).required(),
  city: Joi.string().max(255).required(),
  state: Joi.string().max(255).required(),
  hectaresTotalArea: Joi.number().positive().required(),
  agriculturalTotalArea: Joi.number().positive().required(),
  vegetationTotalArea: Joi.number().positive().required(),
});

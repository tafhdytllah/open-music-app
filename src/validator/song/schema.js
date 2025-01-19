const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().positive().optional(),
  albumId: Joi.string().optional(),
});

const SongQuerySchema = Joi.object({
  title: Joi.string().empty('').optional(),
  performer: Joi.string().empty('').optional(),
});

module.exports = { SongPayloadSchema, SongQuerySchema };

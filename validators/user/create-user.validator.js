const Joi = require('joi');

const { constants, regexpEnum } = require('../../constants');

const girlSubSheme = Joi.array().items(
    Joi.object({
       name: Joi.string().alphanum().max(20),
    })
);

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(40).required(),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    car: Joi.boolean(),
   //робити поле girls required() тільки коли є car
   //age: Joi.number().integer().min(3).max(120),
   //yearOfBorn: Joi.number().integer().min(constants.CURRENT_YEAR - 100).max(constants.CURRENT_YEAR),
    girls: girlSubSheme.optional().when('car', {is: true, then: Joi.required() })
});

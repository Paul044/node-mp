import joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

const validator = joiValidator.createValidator({ passError: true }); // We're passing errors to nex middleware to handle all errors same way

const userSchema = joi.object({
    login: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')),
    age: joi.number().integer().min(4).max(130).required()
});

const userWithIdSchema = userSchema.keys({
    id: joi.string().guid().required()
});

const uuidSchema = joi.object({
    id: joi.string().guid().required()
});

const validators = {
    user: validator.body(userSchema),
    userWithId: validator.body(userWithIdSchema),
    uuid: validator.params(uuidSchema)
};

export default validators;

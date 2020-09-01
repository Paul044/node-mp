import joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

const validator = joiValidator.createValidator({});

const userSchema = joi.object({
    login: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')),
    age: joi.number().integer().min(4).max(130).required()
});

const userWithIdSchema = userSchema.keys({
    id: joi.string().required()
});

const validators = {
    user: validator.body(userSchema),
    userWithId: validator.body(userWithIdSchema)
};

export default validators;

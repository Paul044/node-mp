import joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

const validator = joiValidator.createValidator({ passError: true }); // We're passing errors to nex middleware to handle all errors same way

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

const validators = {
    login: validator.body(loginSchema)
};

export default validators;

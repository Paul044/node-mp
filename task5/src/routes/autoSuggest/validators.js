import joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

const validator = joiValidator.createValidator({ passError: true });

const paramsSchema = joi.object({
    limit: joi.number().integer().required(),
    loginSubstring: joi.string().required()
});

const validators = {
    getAutoSuggestUsersQuery: validator.query(paramsSchema)
};

export default validators;

const Joi = require("joi");

module.exports.registerValidation = data => {
    const schema = Joi.object({
        firstname: Joi
            .string()
            .min(3)
            .required(),
        lastname: Joi
            .string()
            .min(2)
            .required(),
        password: Joi
            .string()
            .min(8)
            .required(),
        login: Joi
            .string()
            .required()
            .min(5),
        sex: Joi.string(),
        profession: Joi.string()
            .optional().allow(" "),
        cni: Joi
            .optional().allow(" "),
        birthday: Joi.string()
            .optional().allow(" "),
        phone: Joi
            .optional().allow(" "),
        permission: Joi
            .optional().allow(" "),
    });
    return schema.validate(data);
}

module.exports.loginValidation = data => {
    const schema = Joi.object({
        password: Joi
            .string()
            .min(8)
            .required(),
        login: Joi
            .string()
            .required()
            .min(5)
    });
    return schema.validate(data);
}
module.exports.updateValidation = data => {
    const schema = Joi.object({
        firstname: Joi
            .string(),
        lastname: Joi
            .string(),
        login: Joi.string(),
        sex: Joi.string(),
        profession: Joi.string(),
        address: Joi.object(),
        cni: Joi.string(),
        birthday: Joi.string(),
        nationality: Joi.string(),
        phone: Joi.string()
    })
    return schema.validate(data);
}



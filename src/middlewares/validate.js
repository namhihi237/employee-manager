import Joi from "joi";
import { validateRequestAdmin } from "../utils";

const createUserSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().alphanum().required().min(3).max(255),
        password: Joi.string().required().min(6).max(255),
        name: Joi.string().required().max(255),
        age: Joi.number().required(),
        address: Joi.string().required().max(255),
    });
    validateRequestAdmin(req, res, next, schema);
};

const editUserSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().max(255),
        age: Joi.number().required(),
        address: Joi.string().required().max(255),
    });
    validateRequestAdmin(req, res, next, schema);
};
export const validateSchema = { createUserSchema, editUserSchema };

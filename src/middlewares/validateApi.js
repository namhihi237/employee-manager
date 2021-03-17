import Joi from "joi";
import { validateRequest } from "../utils";

const adminRegisterSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().alphanum().required().min(3).max(50),
        password: Joi.string().required(),
        key: Joi.string(),
        role: Joi.number().valid(0, 1),
    });
    validateRequest(req, next, schema);
};

const adminLoginSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().alphanum().required().min(3).max(50),
        password: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

const userCreateSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required().min(1),
        address: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

const userUpdateSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string(),
        age: Joi.number().min(1),
        address: Joi.string(),
    });
    validateRequest(req, next, schema);
};
export const validateSchemaApi = {
    adminLoginSchema,
    userCreateSchema,
    userUpdateSchema,
    adminRegisterSchema,
};

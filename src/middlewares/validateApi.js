import Joi from "joi";
import { validateRequest } from "../utils";

const adminRegisterSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().alphanum().required().min(3).max(255),
        password: Joi.string().required().min(6).max(255),
        key: Joi.string(),
        role: Joi.number().valid(0, 1),
    });
    validateRequest(req, next, schema);
};

const adminLoginSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().alphanum().required().min(3).max(255),
        password: Joi.string().required().min(6).max(255),
    });
    validateRequest(req, next, schema);
};

const userCreateSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().alphanum().required().min(3).max(255),
        password: Joi.string().required().min(6).max(255),
        name: Joi.string().required().max(255),
        age: Joi.number().required(),
        address: Joi.string().required().max(255),
    });
    validateRequest(req, next, schema);
};

const userUpdateSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().max(255),
        age: Joi.number().required(),
        address: Joi.string().required().max(255),
    });
    validateRequest(req, next, schema);
};
export const validateSchemaApi = {
    adminLoginSchema,
    userCreateSchema,
    userUpdateSchema,
    adminRegisterSchema,
};

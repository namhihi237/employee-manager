import { Router } from "express";
import { authController } from "../../controllers/api";
import { validateSchemaApi } from "../../middlewares";
const { login, logout, register } = authController;
const { adminLoginSchema, adminRegisterSchema } = validateSchemaApi;
export const authRouter = Router();

authRouter.route("/api/v1/auth/register").post(adminRegisterSchema, register);

authRouter.route("/api/v1/auth/login").post(adminLoginSchema, login);

authRouter.route("/api/v1/auth/logout").post(logout);

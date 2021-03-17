import { Router } from "express";
import { userController } from "../../controllers/api";
import { authMiddlewareAPI, validateSchemaApi } from "../../middlewares";
const { userCreateSchema, userUpdateSchema } = validateSchemaApi;
const { getUsers, createUser, updateUser, deleteUser, getUser, toggleActiveUser } = userController;
export const userRouter = Router();

userRouter.route("/api/v1/users").get(authMiddlewareAPI, getUsers);

userRouter.route("/api/v1/users/:userId").get(authMiddlewareAPI, getUser);

userRouter.route("/api/v1/users").post(authMiddlewareAPI, userCreateSchema, createUser);

userRouter.route("/api/v1/users/:userId").put(authMiddlewareAPI, userUpdateSchema, updateUser);

userRouter.route("/api/v1/users/:userId").delete(authMiddlewareAPI, deleteUser);

userRouter.route("/api/v1/users/:userId/active").put(authMiddlewareAPI, toggleActiveUser);

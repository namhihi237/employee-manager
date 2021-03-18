import { Router } from "express";
import { userController } from "../../controllers/api";
import { authMiddlewareAPI, validateSchemaApi, checkRoleApi } from "../../middlewares";
import { roleConstant } from "../../constant";
const { ADMIN_ROLE, HR_ROLE } = roleConstant;
const { userCreateSchema, userUpdateSchema } = validateSchemaApi;
const { getUsers, createUser, updateUser, deleteUser, getUser, toggleActiveUser } = userController;
export const userRouter = Router();

userRouter
    .route("/api/v1/users")
    .get(authMiddlewareAPI, checkRoleApi(ADMIN_ROLE, HR_ROLE), getUsers);

userRouter
    .route("/api/v1/users/:userId")
    .get(authMiddlewareAPI, checkRoleApi(ADMIN_ROLE, HR_ROLE), getUser);

userRouter
    .route("/api/v1/users")
    .post(authMiddlewareAPI, checkRoleApi(ADMIN_ROLE), userCreateSchema, createUser);

userRouter
    .route("/api/v1/users/:userId")
    .put(authMiddlewareAPI, checkRoleApi(ADMIN_ROLE), userUpdateSchema, updateUser);

userRouter
    .route("/api/v1/users/:userId")
    .delete(authMiddlewareAPI, checkRoleApi(HR_ROLE), deleteUser);

userRouter
    .route("/api/v1/users/:userId/active")
    .put(authMiddlewareAPI, checkRoleApi(ADMIN_ROLE, HR_ROLE), toggleActiveUser);

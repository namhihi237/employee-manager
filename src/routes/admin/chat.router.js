import { Router } from "express";
import { chatController } from "../../controllers/admin";
import { authMiddleware, checkRole } from "../../middlewares";
import { ROLE } from "../../constant";
const { ADMIN_ROLE, HR_ROLE, USER_ROLE } = ROLE;

export const chatRouter = Router();

chatRouter
    .route("/chat")
    .get(authMiddleware, checkRole(USER_ROLE), chatController.viewChat);

chatRouter
    .route("/chat")
    .post(
        authMiddleware,
        checkRole(USER_ROLE, ADMIN_ROLE, HR_ROLE),
        chatController.createMessage
    );

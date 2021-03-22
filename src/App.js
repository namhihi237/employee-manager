import { HttpServer, envVariables } from "./configs";

const { port } = envVariables;
import { defaultMiddleware, errorHandle } from "./middlewares";

import { adminRouter, chatRouter } from "./routes/admin";
import { authRouter, userRouter } from "./routes/api";
import { initialAccount } from "./utils";
export let server;
const main = async () => {
    server = new HttpServer(port);

    server.registerMiddleware(defaultMiddleware);
    server.listen();

    server.registerRouter(adminRouter);
    server.registerRouter(authRouter);
    server.registerRouter(userRouter);
    server.registerRouter(chatRouter);

    server.registerMiddleware(errorHandle);
    initialAccount();
};
main();

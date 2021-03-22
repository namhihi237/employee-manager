import { HttpServer, envVariables } from "./configs";

const { port } = envVariables;
import { errorHandle } from "./middlewares";

import { adminRouter, chatRouter } from "./routes/admin";
import { authRouter, userRouter } from "./routes/api";
import { loaders } from "./loaders";
export let server;
const main = async () => {
    server = new HttpServer(port);

    server.startServer(loaders);

    server.registerRouter(adminRouter);
    server.registerRouter(authRouter);
    server.registerRouter(userRouter);
    server.registerRouter(chatRouter);

    server.registerMiddleware(errorHandle);
};
main();

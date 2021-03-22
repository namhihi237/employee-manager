import express from "express";

export class HttpServer {
    constructor(port) {
        this.port = port;
        this.app = express();
    }

    registerMiddleware(middleware) {
        middleware(this.app);
    }

    startServer(loaders) {
        loaders(this.app);
        this.app.listen(this.port, () => {
            console.log("Server is listening on port", this.port);
        });
    }

    registerRouter(router) {
        this.app.use(router);
    }
}

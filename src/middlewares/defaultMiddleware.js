import bodyParser from "body-parser";
import path from "path";
import express from "express";
import session from "express-session";
import redis from "redis";
// import cookieParser from "cookie-parser";

const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

redisClient.on("error", () => {
    console.error(console.error());
});

redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
});

const morgan = require("morgan");

export const defaultMiddleware = (app) => {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    // app.use(cookieParser());
    app.use(
        session({
            secret: "session123!@#",
            store: new redisStore({ host: "localhost", port: 6379, client: redisClient }),
            saveUninitialized: false,
            resave: false,
        })
    );
    app.set("views", path.join("src/views"));
    app.set("view engine", "pug");
    app.use(bodyParser.json());
    app.use(express.json());

    app.use(express.static("./src/public"));
    app.use(express.static(path.join("src/views")));

    app.use(morgan("dev"));
};

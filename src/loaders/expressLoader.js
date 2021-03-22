import path from "path";
import express from "express";
import session from "express-session";
import redis from "redis";

const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

redisClient.on("error", () => {
    console.error(console.error());
});

redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
});

const morgan = require("morgan");

export const loaders = (app) => {
    app.use(
        session({
            secret: "session123!@#",
            store: new redisStore({
                host: "localhost",
                port: 6379,
                client: redisClient,
            }),
            saveUninitialized: false,
            resave: false,
        })
    );
    app.set("views", path.join("src/views"));
    app.set("view engine", "pug");
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(express.json());

    app.use(express.static("./src/public"));
    app.use(express.static(path.join("src/views")));

    app.use(morgan("dev"));
};

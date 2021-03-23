require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 80,
    DATABASE_URL:
        process.env.DATABASE_URL ||
        "mysql://root:@localhost:3306/userManagement",
    keyAdmin: process.env.KEY_ADMIN || "abcxyz",
    JWT_SECRET: process.env.JWT_SECRET || "n!@#$%",
    firebase_databaseURL:
        process.env.FIREBASE_URL ||
        "https://user-manager-a43bc-default-rtdb.europe-west1.firebasedatabase.app",
    gmail: process.env.GMAIL || "poppy99.dev@gmail.com",
    pass: process.env.PASSWORD || "letrungnam23799@",
    SENDGRID_API_KEY:
        process.env.SENDGRID_API_KEY ||
        "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",
};

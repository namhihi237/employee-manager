require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 5000,
    DATABASE_URL:
        process.env.DATABASE_URL ||
        "mysql://root:@localhost:3306/userManagement",
    keyAdmin: process.env.KEY_ADMIN || "abcxyz",
    firebase_databaseURL : process.env.FIREBASE_URL || "https://user-manager-a43bc-default-rtdb.europe-west1.firebasedatabase.app"
};

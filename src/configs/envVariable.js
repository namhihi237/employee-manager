require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || "mysql://root:@localhost:3306/userManagement",
    jwtSecret: process.env.JWT_SECRET || "123456@",
    keyAdmin: process.env.KEY_ADMIN || "abcxyz",
};

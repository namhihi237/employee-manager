require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || "mysql://root:@localhost:3306/userManagement",
    jwtSecret: process.env.JWT_SECRET || "123456@",
    keyAdmin: process.env.KEY_ADMIN || "abcxyz",

    firebaseConfig: {
        apiKey: "AIzaSyB0fLrWp1yi9sfc4f6Q3eRBtIOhdH7pMls",
        authDomain: "user-manager-a43bc.firebaseapp.com",
        databaseURL: "https://user-manager-a43bc-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "user-manager-a43bc",
        storageBucket: "user-manager-a43bc.appspot.com",
        messagingSenderId: "159042025405",
        appId: "1:159042025405:web:728d3c47bf5e68f04b04d4",
        measurementId: "G-SE7BY98DRP",
    },
};

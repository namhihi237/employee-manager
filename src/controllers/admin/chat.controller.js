import admin from "firebase-admin";

var serviceAccount = require("../../../serviceAccoutKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        "https://user-manager-a43bc-default-rtdb.europe-west1.firebasedatabase.app",
});
const database = admin.database();

const viewChat = (req, res) => {
    res.render("chat.pug");
};

const createMessage = (req, res) => {
    const { content } = req.body;
    const { userName } = req.user;
    try {
        const id = Date.now();
        database.ref("mess/" + id).set({
            id,
            content,
            userName,
        });
        res.send("OK");
    } catch (error) {
        res.redirect("/error");
    }
};

export const chatController = {
    viewChat,
    createMessage,
};

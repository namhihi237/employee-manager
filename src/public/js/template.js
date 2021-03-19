$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
$(".open-button").click(() => {
    document.getElementById("myForm").style.display = "block";
});

var firebaseConfig = {
    apiKey: "AIzaSyB0fLrWp1yi9sfc4f6Q3eRBtIOhdH7pMls",
    authDomain: "user-manager-a43bc.firebaseapp.com",
    databaseURL: "https://user-manager-a43bc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "user-manager-a43bc",
    storageBucket: "user-manager-a43bc.appspot.com",
    messagingSenderId: "159042025405",
    appId: "1:159042025405:web:728d3c47bf5e68f04b04d4",
    measurementId: "G-SE7BY98DRP",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let database = firebase.database();

function uuidv4() {
    return Date.now();
}
function writeMess(userName) {
    const input = document.getElementById("input-data");
    let id = uuidv4();
    database.ref("mess/" + id).set({
        id,
        content: input.value,
        userName,
    });
    input.value = "";
}
database.ref("mess/").on("value", (snapshot) => {
    const data = snapshot.val();
    const msg = document.getElementById("msg");
    // let name = document.getElementById("user").innerText;
    msg.value = "";
    for (let item in data) {
        msg.value += `${data[item].userName}: ${data[item].content}\n`;
    }
    var textarea = document.getElementById("msg");
    textarea.scrollTop = textarea.scrollHeight;
});
let send = document.getElementById("input-data");
send.addEventListener("keydown", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send-btn").click();
    }
});

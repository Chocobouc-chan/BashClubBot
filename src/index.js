const services = require("./services")
const { tmi, database } = require("./utils")
const { onMessageHandler } = require("./messageHandler")
const { newQuestion, userResponse, displayPoints } = require("./quiz")

tmi.on('message', onMessageHandler)
const populateDataBase = async () => {
    await database.ref(`quiz/1`).set({
        question: "Comment s'appelle l'amoureux d'Anastasya ?",
        typeQuestion: "normal",
        answers: [{ letter: "A", answer: "Roméo" }, { letter: "B", answer: "Jeff" }, { letter: "C", answer: "Paul" }, { letter: "D", answer: "Aiden" }],
        goodAnswer: "B",
        points: 3,
        author: "",
        ressource: ""
    });

    await database.ref(`quiz/users/0`).set({
        displayName: "fort",
        points: 100
    });
    await database.ref(`quiz/users/1`).set({
        displayName: "naze",
        points: 2
    });
    await database.ref(`quiz/users/2`).set({
        displayName: "bof",
        points: 5
    });
    await database.ref(`quiz/users/3`).set({
        displayName: "ok",
        points: 50
    });
    await database.ref(`quiz/users/4`).set({
        displayName: "meh",
        points: 47
    });
    await database.ref(`quiz/users/5`).set({
        displayName: "raté",
        points: 18
    });
    await database.ref(`quiz/users/6`).set({
        displayName: "éclaté",
        points: 0
    });
    await database.ref(`quiz/users/7`).set({
        displayName: "pas mal",
        points: 88
    });
}
populateDataBase() 

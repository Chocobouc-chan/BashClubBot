const { so } = require("./shoutout")
const { database, tmi } = require("./utils")
const { newQuestion, userResponse, displayPoints, clearQuestion } = require("./quiz")
const { constants } = require("./constants")
const onMessageHandler = (channel, tags, message, self) => {
    if (self) return;

    if (tags["first-msg"]) {
        tmi.say(channel, constants.welcome + tags["display-name"])
    }

    addToMessageCount(tags["display-name"])

    const PREFIX = "!";
    let [command, ...args] = message.slice(PREFIX.length).split(/ +/g);
    switch (command) {
        case "so":
            so(channel, args[0]);
            break;
        case "test":
            tmi.say(channel, "Tu veux tester quoi frérot ? Je marche bien");
            break;
        case "getUsers":
            getUsers();
            break;
        case "newQuestion":
            newQuestion(channel, 1);
            break;
        case "rep":
            userResponse(tags, args[0]);
            break;
        case "points":
            displayPoints(channel)
            break;
        case "clearQuestion":
            clearQuestion();
            break;
    }
}

const addToMessageCount = async (user) => {
    await database.ref(`users/${user}`).transaction(snapshot => {
        var user = snapshot.val();
        if (!snapshot.exists()) {
            // Create it
            user = {
                messageCount: 0
            };
        }
        user.messageCount += 1;
        return { ...user };
    });
}

const getUsers = async () => {
    result = await database.ref('users').get()
    console.log(result.val())
}

module.exports = { onMessageHandler }

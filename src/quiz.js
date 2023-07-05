const { database, tmi } = require("./utils")
const { quizService } = require("./quizService")

const newQuestion = async (channel, questionId) => {
    const questionFromDatabase = (await database.ref(`quiz/${questionId}`).get()).val()
    quizService.setQuestion(questionFromDatabase)
    const { question, answers } = questionFromDatabase
    tmi.say(channel, `Question numéro ${questionId} : ${question}`);
    for (const index in answers) {
        const { letter, answer } = answers[index]
        tmi.say(channel, `Réponse ${letter} : ${answer}`);
    }
    quizService.setTimesUp(false)
    setTimeout(() => { clearQuestion(channel) }, 10000)
}

const updateTopViewers = async (channel) => {
    const users = (await database.ref("quiz/users").get()).val()
    const arrayOfUsers = Object.values(users)
    arrayOfUsers.sort((user1, user2) => sortByHighestPoints(user1, user2))
    quizService.setTopViewers(arrayOfUsers)
    displayTopViewers(channel)
}

const sortByHighestPoints = (x, y) => {
    if (x.points < y.points) {
        return 1;
    }
    if (x.points > y.points) {
        return -1;
    }
    return 0;
}

const displayTopViewers = (channel) => {
    const topViewers = quizService.topViewers.slice(0, 5)
    for (index in topViewers) {
        tmi.say(channel, `${+index + 1}. ${topViewers[index].displayName} avec ${topViewers[index].points} points !`);
    }

}

const clearQuestion = (channel) => {
    console.log("Clearing question")
    quizService.setTimesUp(true)
    quizService.clearAlreadyAnswered()
    updateTopViewers(channel);
}


const userResponse = async (tags, message) => {
    const { alreadyAnswered, pushAlreadyAnswered, question, timesUp } = quizService
    if (alreadyAnswered.includes(tags["user-id"] || timesUp)) return
    pushAlreadyAnswered(tags["user-id"]);
    if (timesUp || message.toLowerCase() !== question.goodAnswer.toLowerCase()) return
    await database.ref(`quiz/users/${tags["user-id"]}`).transaction(snapshot => {
        let user = snapshot.val();
        if (!snapshot.exists()) {
            user = {
                displayName: tags["display-name"],
                points: 0
            };
        }
        user.points += question.points;
        return { ...user };
    });
}

const displayPoints = async (channel) => {
    const users = (await database.ref("quiz/users").get()).val()
    for (const index in users) {
        tmi.say(channel, `${users[index].displayName} a ${users[index].points} points!`);
    }
}


module.exports = { newQuestion, userResponse, displayPoints, clearQuestion }
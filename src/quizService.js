const quizService = {
    alreadyAnswered: [],
    question: {},
    timesUp: true,
    topViewers: [],
    pushAlreadyAnswered(user) {
        quizService.alreadyAnswered.push(user)
    },
    setQuestion(question) {
        quizService.question = question
    },
    setTimesUp(timesUp) {
        quizService.timesUp = timesUp
    },
    clearAlreadyAnswered() {
        quizService.alreadyAnswered = []
    },
    setTopViewers(viewers) {
        quizService.topViewers = viewers
    },
    clearTopViewers() {
        quizService.topViewers = []
    }
}

module.exports = { quizService }
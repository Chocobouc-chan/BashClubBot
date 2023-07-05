const { AceBase } = require('acebase');
const tmi = require('tmi.js');

const startDatabase = () => {
    const database = new AceBase('BashClubDatabase');
    database.ready(() => {
        console.log("AceBase ready for use")
    });
    return database;
}
const database = startDatabase()

const startTMI = () => {
    client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: process.env.TWITCH_BOT_USERNAME,
            password: `oauth:${process.env.OAUTH_TOKEN}`
        },
        channels: ['BashClubBot']
    });
    client.connect();
    return client;
}

const tmiClient = startTMI()

const testDatabase = async (user) => {
    database.ref('users').remove()
    await database.ref(`users/${user}`).set({
        messageCount: 0
    });

    let result = await database.ref('users/toto').get()
    console.log(result.val())
    await database.ref(`users/${user}`).transaction(snapshot => {
        var user = snapshot.val();
        if (!snapshot.exists()) {
            // Create it
            user = {
                messageCount: 0
            };
        }
        user.messageCount += 1;
        return user;
    });
    result = await database.ref('users/toto').get()
    console.log(result.val())
    result = await database.ref('users').get()
    console.log(result.val())

    await database.ref('users').remove()
    await database.ref(`users/toto`).set({
        messageCount: 0
    });
    await database.ref(`users/toto`).transaction(snapshot => {
        var user = snapshot.val();
        if (!snapshot.exists()) {
            // Create it
            user = {
                messageCount: 0
            };
        }
        user.messageCount += 1;
        user.banned = false
        return { ...user };
    });
    const hehe = await database.ref('users/toto').get()
    console.log(hehe.val())

}

module.exports = { database, tmi: tmiClient }
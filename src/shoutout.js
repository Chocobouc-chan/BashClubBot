const { getUsersFromLogins, getChannelFromId } = require("./services")
const { so1, so2 } = require("./constants")

const so = async (channel, username) => {
    const responseFromGetUserId = await getUsersFromLogins([username]);
    const responseFromGetChannelId = await getChannelFromId(
        responseFromGetUserId.data[0].id
    );
    const lastPlayedGame = responseFromGetChannelId.data[0].game_name
        ? responseFromGetChannelId.data[0].game_name
        : noIdea;

    client.say(channel, so1 + responseFromGetUserId.data[0].display_name + so2 + lastPlayedGame);
};

module.exports = { so }
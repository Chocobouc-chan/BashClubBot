require('dotenv').config();
const fetch = require("node-fetch")
const fs = require('fs');

const optsGet = {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${process.env.OAUTH_TOKEN}`,
        "Client-Id": process.env.CLIENT_ID
    }
}

const getUsersFromLogins = async (users) => {
    let logins = "";
    users.map((login, index) => {
        logins += `${index !== 0 ? "&" : ""}login=${login}`;
    });
    return await get(`https://api.twitch.tv/helix/users?${logins}`, optsGet)
}

const getChannelFromId = async (channelId) => {
    return await get(`https://api.twitch.tv/helix/channels?broadcaster_id=${channelId}`, optsGet)
}

const get = async (url, body = {}) => {
    try {
        const response = await fetch(url, optsGet);
        return await response.json();
    } catch (error) {
        handleError(error)
    }
}


module.exports = { getUsersFromLogins, getChannelFromId }

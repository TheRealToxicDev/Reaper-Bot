const { Client } = require ('discord.js');

const config = require ('./Config/botSettings');
const API = require ('./FiveM-API/FiveM-API');

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ["TYPING_START"]
});

require("module-alias/register");

client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();

client.config = config;
client.API = API;

const command = require ('./Structure/command');
command.run(client);

const event = require ('./Structure/event');
event.run(client);

client.login(client.config.token);
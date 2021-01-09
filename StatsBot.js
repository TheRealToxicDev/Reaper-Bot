const { Client, Collection } = require ('discord.js');

const config = require ('./Config/botSettings');
const API = require ('./FiveM-API/FiveM-API');

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ["TYPING_START"]
});

require("module-alias/register");

client.commands = new Collection();
client.aliases = new Collection();

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true},(err) => {
    if (err) return console.error(err);
    console.log("MONGODB IS CONNECTED")
    })


client.limits = new Map();

client.config = config;
client.API = API;

const command = require ('./Structure/command');
command.run(client);

const event = require ('./Structure/event');
event.run(client);

client.login(client.config.token);

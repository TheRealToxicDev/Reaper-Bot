const { MessageEmbed } = require ('discord.js');
const Guilds = require ('@Database/guildSchema');
const FiveM = require ('@FiveM/FiveM-API');
const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');
const Q3RCon = require ('quake3-rcon');
const req = require('request');
const modules = require("./modules")
const log = require("./modules/log") 
const crypto = require("crypto-js");
const tempNatives = require("./auth/temp.json")
const listNatives = require("./auth/names.json")
const fs = require("fs");
const dns = require('dns');
const sleep = require("system-sleep");
const createHash = require('hash-generator'); // horrible idea btw
const Fuse = require("fuse.js")
const colors = require("colors")

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        let query = []

        let search_query = args.join(' ');

        let options = {
            shouldSort: true,
            findAllMatches: true,
            includeMatches: true,
            threshold: 0.8,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
        };

        let fuse = new Fuse(listNatives, options);

        let result = fuse.search(search_query);

        for (i = 0; i < tempNatives.length; i++) {

            if (tempNatives[i].body == result[0].matches[0].value) {

                query.push(tempNatives[i].prefix)

                let query_message = new MessageEmbed()
                  .setAuthor('FiveM Native Search', EmbedComponents.embedImage)
                  .setColor(EmbedColors.onlineColor)
                  .setDescription(`${tempNatives[i].body}`)
                  .addField('Body', `${tempNatives[i].prefix}`, true)
                  .addField('Description', `${tempNatives[i].description}`, true)
                  .addField('Search Query', `${search_query}`, true)
                  .setTimestamp()
                  .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

                  return message.channel.send(query_message)
            }
        }
    } catch (error) {

        let error_embed = new MessageEmbed()
          .setAuthor('Error with Setup', EmbedComponents.embedImage)
          .setColor(EmbedColors.offlineColor)
          .setDescription('Please report this to Toxic Dev')
          .addField('Error', `${error.message}`, true)
          .setTimestamp()
          .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
        
       return message.channel.send(error_embed)

    }
}

module.exports.help = {
    name: "native",
    category: "Utility",
    aliases: [],
    description: "FiveM Native Search",
    example: "``fsb.native <Search Query>``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    devOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

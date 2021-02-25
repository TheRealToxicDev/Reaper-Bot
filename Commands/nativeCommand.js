const { MessageEmbed } = require ('discord.js');
const Guilds = require ('@Database/guildSchema');
const FiveM = require ('@FiveM/FiveM-API');
const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');
const Q3RCon = require ('quake3-rcon');
const req = require('request');
const crypto = require("crypto-js");
const tempNatives = require("../Auth/temp.json")
const listNatives = require("../Auth/names.json")
const fs = require("fs");
const dns = require('dns');
const sleep = require("system-sleep");
const createHash = require('hash-generator'); // horrible idea btw
const Fuse = require("fuse.js")
const colors = require("colors")

module.exports.run = async (client, message, args) => {

   let guild = await Guilds.findOne({ guildID: message.guild.id });

   if (!guild) await new Guilds({ guildID: message.guild.id }).save();

   let prefix = guild.prefix || 'fsb.'

    message.delete().catch()

        let no_args = new MessageEmbed()
            .setAuthor('Error: Missing Search Query', EmbedComponents.embedImage)
            .setColor(EmbedColors.offlineColor)
            .setDescription('Please provide something to search')
            .addField('Command Example', `${prefix}native SetPedToRagdoll`, true)
            .setTimestamp()
            .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

        if (!args[0]) return message.channel.send(no_args);

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
                  .addField('Type', `${tempNatives[i].description}`, true)
                  .addField('Query', `${search_query}`, true)
                  .setTimestamp()
                  .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

                  return message.channel.send(query_message)
            }
        }
    } catch (error) {

        let error_embed = new MessageEmbed()
          .setAuthor('Error with Search', EmbedComponents.embedImage)
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
    devOnly: true
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

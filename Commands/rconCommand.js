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

    message.delete().catch()

    try {

        let guild = await Guilds.findOne({ guildID: message.guild.id });

        if (!guild) await new Guilds({ guildID: message.guild.id }).save();

        let prefix = guild.prefix || 'fsb.';

        let no_args = new MessageEmbed()
            .setAuthor('Error: Missing Args', EmbedComponents.embedImage)
            .setColor(EmbedColors.offlineColor)
            .setDescription('Please enter a `rcon_ password`')
            .addField('Command Example', `${prefix}rcon set password123`, true)
            .addField('Command Help', `${prefix}rcon help`, true)
            .setTimestamp()
            .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

        if (!args[0]) return message.channel.send(no_args);


        if (args[0] == 'set') {

            if (args[1] == null || args[1] == ' ' || !args[1]) {
                
                let no_password = new MessageEmbed()
                  .setAuthor('Error with Setup', EmbedComponents.embedImage)
                  .setColor(EmbedColors.offlineColor)
                  .setDescription('Please enter a `rcon_ password`')
                  .addField('Command Example', `${prefix}rcon set password123`, true)
                  .addField('Command Help', `${prefix}rcon help`, true)
                  .setTimestamp()
                  .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

                  return message.channel.send(no_password)
            } 

            guild.rconPassword === args.slice(1).join(' ');

            await guild.save();

        } else if (args[0] == 'help') {

            let rcon_help = new MessageEmbed()
              .setAuthor('Rcon Command Help', EmbedComponents.embedImage)
              .setColor(EmbedColors.onlineColor)
              .setDescription('Heres some tips to get you started')
              .addField("RCON in FiveM", "RCON basically is the highest rank of administration on a server. After you login with RCON while playing on a server, you can change basically any server setting")
              .addField("Setting up RCON for FXServer", "In your `server.cfg`, un-comment/add `rcon_password your_password` anywhere in the file.")
              .addField("Linking FXServer to Reaper Bot", `Do \`${prefix}rcon set your_rconpassword\` in a channel where no one can see the message`)
              .addField("Executing RCON Commands with FiveM Bot", `In any channel, do \`${prefix}rcon any_command\` (arguments too)\nFind [RCON Commands](https://docs.fivem.net/server-manual/server-commands/) here.`)
              .addField("RCON Password Security", "**All** RCON passwords are encrypted in [AES Encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) and are secured.")
              .setTimestamp()
              .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

            return message.channel.send(rcon_help)
        } else {
            let ip = guild.FiveMServer;

            let temp = ip.split(':');

            var rcon = new Q3RCon({
                address: temp[0],
                port: temp[1],
                password: guild.rconPassword
            });

            rcon.send(args.join(' '), function (response) {

            let rcon_output = new MessageEmbed()
              .setAuthor('RCON Command Results', EmbedComponents.embedImage)
              .setColor(EmbedColors.onlineColor)
              .addField('Output Address', `${guild.FiveMServer}`)
              .addField('Output Response' `${response.slice(6)}`)
              .addField('RCON Query', `${args.join(' ')}`)
              .setTimestamp()
              .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

              message.channel.send(rcon_output)

              return;
            })
        }
    } catch (error) {

        let error_embed = new MessageEmbed()
          .setAuthor('Error with Setup', EmbedComponents.embedImage)
          .setColor(EmbedColors.offlineColor)
          .setDescription('Please report this to Toxic Dev')
          .addField('Error', `${error}`, true)
          .setTimestamp()
          .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
        
       return message.channel.send(error_embed)

    }
}

module.exports.help = {
    name: "rcon",
    category: "Utility",
    aliases: [],
    description: "Set your RCON Password, or Execute RCON Commands.",
    example: "``fsb.rcon``"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["EMBED_LINKS"],
    devOnly: true
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

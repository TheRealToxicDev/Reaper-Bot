const { MessageEmbed } = require ('discord.js');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        let help_embed = new MessageEmbed()
           .setAuthor('FiveM Stats Bot Help', EmbedComponents.embedImage)
           .setColor(EmbedColors.mainColor)
           .setDescription('Finding yourself stuck? Heres some help!!')
           .addField('Set a Server IP', '``fsb.setip`` || Used to set your FiveM Server IP', true)
           .addField('Setup Command', 'COMING SOON || Completes the Setup for you!!', true)
           .setTimestamp()
           .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

           return message.channel.send(help_embed);

    } catch (error) {

        let error = new MessageEmbed()
        .setAuthor('Critical Error', EmbedComponents.embedImage)
        .setColor(EmbedColors.mainColor)
        .setDescription('Please report this to Toxic Dev')
        .addField('Error', `${error.message}`, true)
        .setTimestamp()
        .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

    }
}

module.exports.help = {
    name: "help",
    category: "Info",
    aliases: ['helpme', 'h'],
    description: "Shows my help message.",
    example: "``fsb.help || fsb.help <commandName>``"
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
const { MessageEmbed } = require ('discord.js');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        let website_link ='https://statsbot.toxicdev.me'

        let help_embed = new MessageEmbed()
           .setAuthor('FiveM Stats Bot Help', EmbedComponents.embedImage)
           .setColor(EmbedColors.mainColor)
           .setDescription('Finding yourself stuck? Heres some help!!')
           .addField('Setup Command', '``fsb.setup`` | Link your FiveM Server Info to the Bot', true)
           .addField('Stats Command', '``fsb.server-stats`` | Display your FiveM Server Stats', true)
           .addField('Invite Command', '``fsb.invite`` | Invite the bot to your server', true)
           .addField('Prefix Command', '``fsb.prefix`` | Set the bots prefix for your server', true)
           .addField('\u200B', '\u200B')
           .addField('My Website', `[Click Me](${website_link})`, true)
           .addField('My Website', `[Click Me](${website_link}/dashboard)`, true)
           .addField('Privacy Policy', `[Click Me](${website_link}/privacy)`, true)
           .addField('Commands List', `[Click Me](${website_link}/commands)`, true)
           .addField('Bug Reports', `[Click Me](${website_link}/bug)`, true)
           .addField('GitHub', `[Click Me](https://github.com/TheRealToxicDev/FiveM-Stats-Bot)`)
           .setTimestamp()
           .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

           return message.channel.send(help_embed);

    } catch (error) {

        let error_embed = new MessageEmbed()
        .setAuthor('Critical Error', EmbedComponents.embedImage)
        .setColor(EmbedColors.mainColor)
        .setDescription('Please report this to Toxic Dev')
        .addField('Error', `${error.message}`, true)
        .setTimestamp()
        .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
        
        return message.channel.send(error_embed)

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
    devOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

const { MessageEmbed } = require ('discord.js');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        let help_embed = new MessageEmbed()
           .setAuthor('Invite | FiveM Stats Bot', EmbedComponents.embedImage)
           .setColor(EmbedColors.mainColor)
           .setDescription('Invie me to your server using the following link.')
           .addField('Invite Link', '[Click Me](https://discord.com/api/oauth2/authorize?client_id=797247285981478923&permissions=2146828102&scope=bot)', true)
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
    devOnly: true
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

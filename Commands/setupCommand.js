const { MessageEmbed } = require ('discord.js');

const Guilds = require ('@Database/guildSchema');
const FiveM = require ('@FiveM/FiveM-API');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {
        
     if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send('Only Server Admins can execute this command!');
        
        let guild = await Guilds.findOne({ guildID: message.guild.id });

        if (!guild) await new Guilds({ guildID: message.guild.id }).save();

        let setup_message = new MessageEmbed()
           .setAuthor('FiveM Stats | Setup', EmbedComponents.embedImage)
           .setColor(EmbedColors.mainColor)
           .setDescription('Please choose one of the following.')
           .addField('[1] Server IP and Port', 'Used to set Your Servers IP and Port so the bot can read your stats JSON', true)
           .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

        
        let FiveMInfo = args.slice(0).join(' ');

        if (!FiveMInfo) return message.channel.send('Please provide the Server IP and Port \n > (IE: **fsb.setup 0.0.0.0:0000**)')

        if (!FiveMInfo.includes(':')) return message.channel.send('Please provide the Server IP and Port \n > (IE: **fsb.setup 0.0.0.0:0000**)')

        await Guilds.updateOne({ guildID: message.guild.id }, { $set: { FiveMServer: FiveMInfo }});

        let setup_complete = new MessageEmbed()
        .setAuthor('FiveM Stats | Complete', EmbedComponents.embedImage)
        .setColor(EmbedColors.onlineColor)
        .setDescription('Your Server IP and Port have been set. \n\nIf you have made an error, or wish to change the connected FiveM server, run **fsb.setup** again.')
        .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

        return message.channel.send(setup_complete)


    
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
    name: "setup",
    category: "Utility",
    aliases: ['set', 'config'],
    description: "Run the setup process.",
    example: "``fsb.setup || fsb.setup <2> false``"
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

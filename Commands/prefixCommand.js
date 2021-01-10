const { MessageEmbed } = require ('discord.js');

const Guilds = require ('@Database/guildSchema');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {
    
      if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send('Only Server Admins can execute this command!');

    let guild = await Guilds.findOne({ guildID: message.guild.id });

    if (!guild) await new Guilds({ guildID: message.guild.id }).save();
    
    let new_prefix = args.slice(0).join(' ');

    let tomany_args = new MessageEmbed()
       .setAuthor('Error: Missing Args', EmbedComponents.embedImage)
       .setColor(EmbedColors.mainColor)
       .setDescription('Prefix cant be more then 10 Characters')
       .addField('Default Prefix', 'fsb.', true)
        .addField('Current Prefix', guild.prefix, true)
       .setTimestamp()
       .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

    if (new_prefix.length > 10) return message.channel.send(tomany_args);
    
        let missing_args = new MessageEmbed()
       .setAuthor('Error: Missing Args', EmbedComponents.embedImage)
       .setColor(EmbedColors.mainColor)
       .setDescription('Please provide the required args ``fsb.prefix newPrefix``')
       .addField('Default Prefix', 'fsb.', true)
       .addField('Current Prefix', guild.prefix, true)
       .setTimestamp()
       .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
    
    if (!new_prefix) return message.channel.send(missing_args);

    guild.prefix = new_prefix;

    await guild.save();

    let embed = new MessageEmbed()
    .setAuthor('Success!', EmbedComponents.embedImage)
    .setColor(EmbedColors.mainColor)
    .setDescription('Prefix has been set')
    .addField('Default Prefix', 'fsb.', true)
    .addField('New Prefix', args[0], true)
    .setTimestamp()
    .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

    return message.channel.send(embed);
}

module.exports.help = {
    name: "prefix",
    category: "Info",
    aliases: ['setprefix'],
    description: "Set the Bots Prefix for this guild.",
    example: "``fsb.prefix <newPrefix>``"
}

module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["EMBED_LINKS"],
    devOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

const { MessageEmbed } = require ('discord.js');

const FiveM = require ('@FiveM/FiveM-API');
const Guilds = require ('@Database/guildSchema');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        let guild = await Guilds.findOne({ guildID: message.guild.id });

        FiveM.getServerInfo(guild.FiveMServer).then(server => {

            let result = [];

            let index = 1;

            for (let player of server.players) {

                result.push(`${index++}. Username: ${player.name} | ID: ${player.id} | Ping: ${player.ping}ms\n`)
            }

            const result_embed = new MessageEmbed()
               .setAuthor('Server Information', EmbedComponents.embedImage)
               .setColor(EmbedColors.onlineColor)
               .setDescription('**STATUS:** ONLINE 🟢')
               .addField('Player Count', `${server.players.length}/${server.info.vars.sv_maxClients}`, true)
               .addField('Player List', result, true)
               .addField('Server Tags', `${server.info.vars.tags}`, true)
               .setTimestamp()
               .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

        }).catch(error => {
        let error = new MessageEmbed()
        .setAuthor('Error in Server Response', EmbedComponents.embedImage)
        .setColor(EmbedColors.offlineColor)
        .setDescription('**STATUS:** OFFLINE 🔴')
        .addField('Server Response', `${error.message}`, true)
        .setTimestamp()
        .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

    });
}

module.exports.help = {
    name: "server-stats",
    category: "Info",
    aliases: ['ss', 'sstats'],
    description: "Shows your FiveM Server Stats.",
    example: "``fsb.server-stats``"
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
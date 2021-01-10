const { MessageEmbed } = require ('discord.js');

const FiveM = require("discord-fivem-api");

//const FiveM = require ('@FiveM/FiveM-API');
const Guilds = require ('@Database/guildSchema');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        message.delete().catch()

        let guild = await Guilds.findOne({ guildID: message.guild.id });
        
        if (!guild) return message.channel.send('Error: Guild Not Found, Please run the setup command first: ``fsb.setup``');
    
            FiveM.getServerInfo(guild.FiveMServer).then(server => {
    
                let result = [];
    
                let index = 1;
    
                for (let player of server.players) {
    
                    result.push(`${index++}. Username: ${player.name} | ID: ${player.id} | Ping: ${player.ping}ms\n`)
                }
                
                if (result < 1) result = 'No Players Online'
                
                if (result === []) result = 'No Players Online'
                
                let players = server.players;
                
                if (!players.length) players = '0';
                
    
                const result_embed = new MessageEmbed()
                   .setAuthor('Server Information', EmbedComponents.embedImage)
                   .setColor(EmbedColors.onlineColor)
                   .setDescription('**STATUS:** ONLINE 🟢')
                   .addField('Player Count', `${players}/${server.infos.vars.sv_maxClients}`, true)
                   //.addField('Player List', result, true)
                   .setTimestamp()
                   .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
    
            }).catch(error => {
            let error_embed = new MessageEmbed()
            .setAuthor('Error in Server Response', EmbedComponents.embedImage)
            .setColor(EmbedColors.offlineColor)
            .setDescription('**STATUS:** OFFLINE 🔴')
            .addField('Server Response', `${error.message}`, true)
            .setTimestamp()
            .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
            
            return message.channel.send(error_embed);
    
        });
        
    } catch(e) {
        let error = new MessageEmbed()
        .setAuthor('Critical Error', EmbedComponents.embedImage)
        .setColor(EmbedColors.offlineColor)
        .setDescription('Please Report this error to Toxic Dev in the [Toxic Development](https://discord.gg/MbjZ7xc) Server')
        .addField('Error:', `${e.message}`, true)
        .setTimestamp()
        .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
        
        return message.channel.send(error);

    }
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
    devOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

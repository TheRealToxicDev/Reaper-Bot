
const { MessageEmbed } = require ('discord.js');

const FiveM = require ('@FiveM/FiveM-API');
const Guilds = require ('@Database/guildSchema');

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    try {

        message.delete().catch()
        
        let players;

        let guild = await Guilds.findOne({ guildID: message.guild.id });
        
        if (!guild) return message.channel.send('Error: Guild Not Found, Please run the setup command first: ``fsb.setup``');
    
            FiveM.getServerInfo(guild.FiveMServer).then(server => {
    
                let result = [];
    
                let index = 1;
    
                for (let player of server.players) {
    
                   result.push(`${index++}. Username: ${player.name} | ID: ${player.id} | Ping: ${player.ping}ms\n`)
                }
                
                if (result < 1) result = 'No Players Online'
                
                if(result === 'undefined') result = '0'
                
                let server_name = `${guild.FiveMName} | Information` || "FiveM Server Information"
               
                    
                const result_embed = new MessageEmbed()
                   .setAuthor(server_name, EmbedComponents.embedImage)
                   .setColor(EmbedColors.onlineColor)
                   .setDescription('**STATUS:** ONLINE 🟢')
                   .addField('One Sync', `${server.infos.vars.onesync_enabled}`, true)
                   .addField('Game Build', `${server.infos.vars.sv_enforceGameBuild}`, true)
                   .addField('Scripthook', `${server.infos.vars.sv_scriptHookAllowed}`, true)
                   .addField('Resources', `${server.infos.resources}`, true)
                   .addField('Language', `${server.infos.vars.locale}`, true)
                   .addField('FX Version', `${server.infos.version}`, true)
                   .addField('Server Tags', `${server.infos.vars.tags}`, true)
                   .addField('Player Count', `${server.players.length}/${server.infos.vars.sv_maxClients}`, true)
                   .addField('Player List', result, true)
                   .setTimestamp()
                   .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
                
                return message.channel.send(result_embed);
    
            }).catch(error => {
            
            if (error.message === "players is not defined")
                
            {
                
              let players;
                
                players = '0';
                              
                const empty_embed = new MessageEmbed()
                   .setAuthor('Server Information', EmbedComponents.embedImage)
                   .setColor(EmbedColors.onlineColor)
                   .setDescription('**STATUS:** ONLINE 🟢')
                   .addField('Player List', 'No Active Players', true)
                   .setTimestamp()
                   .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
                
                return message.channel.send(empty_embed);
            }
            else 
            {
               let error_embed = new MessageEmbed()
                .setAuthor('Error in Server Response', EmbedComponents.embedImage)
                .setColor(EmbedColors.offlineColor)
                .setDescription('Uh oh..')
                .addField('Theres been an error fetching this data', `\n Server Response: \n > \`\`\`${error.message}\`\`\``, true)
                .setTimestamp()
                .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
            
                return message.channel.send(error_embed); 
            }
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

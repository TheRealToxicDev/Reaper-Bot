const ms = require('parse-ms');
const { MessageEmbed } = require("discord.js");
const ratetime = new Set()

module.exports = async (client, message) => {

    if(message.author.bot) return;

    let prefix = "fsb."
    
    const args = message.content.split(/ +/g);

    const commands = args.shift().slice(prefix.length).toLowerCase();

    const cmd = client.commands.get(commands) || client.aliases.get(commands);


    if(!message.content.toLowerCase().startsWith(prefix)) return;

    let no_cmd = new MessageEmbed()
    .setAuthor("Command not Found", client.config.embedImage)
    .setDescription(`${commands} Is not a command that i can find.`)
    .setFooter('© FiveM Stats | 2021', client.config.embedImage)

    if(!cmd) return message.channel.send(no_cmd);

    if(!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return;

    let ownerOnly = new MessageEmbed()
    ownerOnly.setTitle("Lacking Permissions ❌")
    ownerOnly.setDescription("Ree!! You dont have permission to use this command!!")

    if(cmd.requirements.devOnly && !client.staff.includes(message.author.id))
    return message.channel.send(ownerEmbed)

    let embed = new MessageEmbed()
    .setAuthor("Lacking Permissions ❌", client.config.embedImage)
    .addField(`Missing Perms`, missingPerms(message.member, cmd.requirements.userPerms))
    .setFooter(client.config.embedImage)
    if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms)) return message.channel.send(embed)
    
    let embed1 = new MessageEmbed()
    .setAuthor("Lacking Permissions ❌", client.user.displayAvatarURL())
    .addField(`Tox Mod Missing Perms`, missingPerms(message.guild.me, cmd.requirements.clientPerms))
    .setFooter('© FiveM Stats | 2021', client.config.embedImage)
    if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms)) return message.channel.send(embed1)


    if(cmd.limits) {

        const current = client.limits.get(`${commands}-${message.author.id}`);     

        if(!current) client.limits.set(`${commands}-${message.author.id}`, 1);    

        else{

            if(current >= cmd.limits.rateLimit) {

                let timeout = ms(cmd.limits.cooldown - (Date.now() - ratetime[message.author.id + commands].times));

                return message.reply("Ratelimit , You need to wait " + "``" + `${timeout.hours}h ${timeout.minutes}m ${timeout.seconds}s`+ "``")
        
            }
            client.limits.set(`${commands}-${message.author.id}`, current + 1);

            ratetime.add(message.author.id + commands)

            ratetime[message.author.id + commands] = {

                times: Date.now()
            }
        }
        setTimeout(() => {

            client.limits.delete(`${commands}-${message.author.id}`);

            ratetime.delete(message.author.id + commands)

        }, cmd.limits.cooldown);
    }
        cmd.run(client, message, args)
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ? 
    `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
    missingPerms[0];

}
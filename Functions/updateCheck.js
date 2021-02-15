const HttpRequest = require ('request');
const { MessageEmbed } = require("discord.js");

const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

const ready_channel = client.channels.cache.find(c => c.id === process.env.READY_LOGS);

function CheckForUpdate() {

    const current_version = '1.0.0';
    const GithubResourceName = 'FiveM-Stats-Bot';

    HttpRequest(
        {
            url: `https://raw.githubusercontent.com/TheRealToxicDev/${process.env.RESOURCE_REPO}/master/${process.env.PROJECT_NAME}/VERSION`,
            timeout: 5000,
            time: true
        },

        function (Error, Response, NewestVersion) {

            let version_check = new MessageEmbed()
            .setAuthor('Version Check Initiated', EmbedComponents.embedImage)
            .setColor(EmbedColors.onlineColor)
            .setDescription('Comparing the Current Version to Newest Release')
            .addField('Current Version', `${current_version}`)
            .addField('Newest Version', `${NewestVersion}`)
            .setTimestamp()
            .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

            ready_channel.send(version_check)

            if (NewestVersion == current_version) {
                let up_to_date = new MessageEmbed()
                .setAuthor('Version Check: Status', EmbedComponents.embedImage)
                .setColor(EmbedColors.onlineColor)
                .setDescription('The Version Check was Successful, Enjoy!!')
                .setTimestamp()
                .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
                
                ready_channel.send(up_to_date)
            } else {
                let outdated = new MessageEmbed()
                outdated.setAuthor('Version Check: Failed', EmbedComponents.embedImage)
                outdated.setColor(EmbedColors.onlineColor)
                outdated.setDescription('You are using an Outdated version of [FiveM Stats Bot](https://statsbot.toxicdev.me/), Please download the Newest Release to avoid any issues.')
                outdated.addField('Current Version', `${current_version}`)
                outdated.addField('Newest Version', `${NewestVersion}`)

                HttpRequest(
                    {
                        url: `https://raw.githubusercontent.com/TheRealToxicDev/${process.env.RESOURCE_REPO}/master/${process.env.PROJECT_NAME}/CHANGES`,
                        timeout: 5000,
                        time: true
                    },
                    function (Error, Response, Changes) {
                        outdated.addField('Change Log', `${Changes}`)
                        outdated.setTimestamp()
                        outdated.setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
                        
                        ready_channel.send(outdated)
                    }
                )
            }
        }
    )
}

module.exports = CheckForUpdate;

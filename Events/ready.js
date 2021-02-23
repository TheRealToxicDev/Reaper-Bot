  
const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "Events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");
const fetch = require ('node-fetch');
const { MessageEmbed } = require ('discord.js');
const EmbedColors = require ('@Embeds/colors');
const EmbedComponents = require('@Embeds/components');

const package = require('../package.json');

module.exports = async (client) => {
  
const ready_channel = client.channels.cache.find(c => c.id === process.env.READY_LOGS);

let activities = [
    {
      name: 'FiveM Server Stats',
      options: {
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
      }
    },
    {
      name: `fsb.help`,
      options: {
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
      }
    },
    {
      name: 'with your Server Stats',
      options: {
        type: 'PLAYING'
      }
    },
    {
      name: 'https://grimreaperbot.site/',
      options: {
        type: 'WATCHING'
      }
    }
  ];
  let i = 0;


   console.log(`Signed in as ${client.user.username} || Loaded [${eventFiles2.length}] event(s) & [${client.commands.size}] command(s)`);
   timers.setInterval(() => {
    i = i == activities.length ? 0 : i;
   client.user.setActivity(activities[i].name, activities[i].options);

    i++;
  }, 30000);
  
     await fetch(process.env.VERSION_API)
      .then(res => res.json())
      .then(json => {

            if (json.currentVersion === package.version) {
              
            let up_to_date = new MessageEmbed()
            .setAuthor('Version Check: Successful', EmbedComponents.embedImage)
            .setColor(EmbedColors.onlineColor)
            .setDescription('Up-To Date and Ready to go!!')
            .addField('Current Version', `v${package.version}`)
            .addField('Newest Version', `v${json.currentVersion}`)
            .setTimestamp()
            .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)
              
            return ready_channel.send(up_to_date);
              
            } else if (json.currentVersion !== package.version) { {
                let outdated = new MessageEmbed()
                .setAuthor('Version Check: Failed', EmbedComponents.embedImage)
                .setColor(EmbedColors.offlineColor)
                .setDescription('You are using an Outdated version of [Reaper Bot](https://grimreaperbot.site/), Please update to the Newest Release to avoid any possible issues.')
                .addField('Current Version', `v${package.version}`)
                .addField('Newest Version', `v${json.currentVersion}`)
                .addField('Change Log', `${json.changeLog}`)
                .addField('Download Link', '[Click Me](https://github.com/TheRealToxicDev/Reaper-Bot/releases)')
                .addField('Change Log', '[Click Me](https://grimreaperbot.site/changes)')
                .setTimestamp()
                .setFooter(EmbedComponents.embedFooter, EmbedComponents.embedImage)

                     return ready_channel.send(outdated)
                  }
            }
      })
}

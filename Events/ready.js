  
const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "Events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");
const HttpRequest = require('request');

const CheckForUpdate = require('@Functions/updateCheck');


module.exports = async (client) => {

  CheckForUpdate();

let activities = [
    {
      name: 'FiveM Server Stats',
      options: {
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
      }
    },
    {
      name: ` fsb.help || fsb.setup (Soon)`,
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
      name: 'statsbot.toxicdev.me',
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
}

function CheckForUpdate() {
    
    const ready_channel = client.channels.cache.find(c => c.id === process.env.READY_LOGS);

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

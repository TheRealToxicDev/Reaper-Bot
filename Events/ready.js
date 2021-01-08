  
const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "Events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");



module.exports = async (client) => {

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
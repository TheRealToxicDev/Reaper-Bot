const mongo = require ('mongoose');

const guildSchema = new mongo.Schema({
    guildID: {
        type: String,
        unique: true
    },

    blacklisted: {
        type: Boolean,
        default: false
    },

    FiveMServer: {
        type: String,
        unique: true
    },
    
    FiveMName: {
        type: String,
        unique: true,
        default: 'FiveM Server Information'
    },

     rconPassword: {
         type: String,
         unique: true
    },
    
     prefix: {
        type : String,
        default: 'fsb.',
    },
});

module.exports = mongo.model("Guilds", guildSchema);

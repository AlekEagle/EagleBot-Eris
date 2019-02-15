'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'github',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            return 'here you go: https://github.com/AlekEagleYT/EagleBot-Eris';
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'My GitHub page (updated once a lifetime)'
    }
}
'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'yeet',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            msg.channel.createMessage('<@' + msg.author.id + '> Thou shalt be yaught young one.');
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Yeets you.'
    }
}
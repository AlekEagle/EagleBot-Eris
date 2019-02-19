'use strict';

let manager = require('../functions/blacklistManager');
let eco = require('../functions/economy');

module.exports = {
    name: 'daily',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            eco.readWal(msg.author.id).then((wal) => {
                eco.updateWal(msg.author.id, parseInt(wal.money) + 200, wal.spinner)
                msg.channel.createMessage('You have earned 200 e-bucks! Wait 18 hours before using the command again.')
            }, () => {
                eco.updateWal(msg.author.id, 200, 0)
                msg.channel.createMessage('You have earned 200 e-bucks! Wait 18 hours before using the command again.')
            });
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'daily money command, useable every 18 hours.',
        cooldown: 64800000,
        cooldownMessage: 'You can\'t use the daily command again, wait at least 18 hours!'
    }
}
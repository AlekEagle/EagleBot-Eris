'use strict';

let nums = require('../functions/numbers');
const fs = require('fs');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'cancercured',

    exec: (client, msg, args) => {
        ++nums.cmdsRan;
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            fs.readFile('./cancercured.txt', 'utf-8', (err, data) => {
                msg.channel.createMessage(`Cancer has been cured \`${data}\` times since I started to keep track.`)
            })
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Shows how many times cancer has been cured.'
    }
}
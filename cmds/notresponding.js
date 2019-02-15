'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'notresponding',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var thing = ''
            if (msg.content.split(' ').splice(1)[0] !== undefined) {
                thing = msg.content.split(' ').splice(1).join(' ')
                try {
                    if (client.users.get(thing.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username !== undefined) {
                        thing = client.users.get(thing.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username;
                    }
                }catch (err) {
                    thing = msg.content.split(' ').splice(1).join(' ')
                }
            }else {
                thing = msg.author.username
            }
            return `**${thing}.exe is not responding**\n*If you close the program, you may lose information.*\n➡Close the program\n➡Wait for the program to respond`;
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: '___ is not responding, go nuts!',
        usage: '(thing)'
    }
}
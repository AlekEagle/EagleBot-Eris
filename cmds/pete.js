'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'pete',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var args = msg.content.split(' ').splice(1).join(' ').split('|')
            msg.channel.createMessage(`Attention all members of ${msg.channel.guild.name}, ${args[0]}, and all you need to do is get your moms credit card, the expiration date, and the three weird numbers on the back to get ${args[1]}!`)
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'a voiceover pete copy pasta',
        usage: '(situation)|(reward)'
    }
}
'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'suggestcmd',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var suggestcmd = msg.content.split(' ').splice(1).join(' ')
            client.createMessage('474203569671897104', '**__' + msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ')' + ' suggested the command: __**' + suggestcmd)
            client.createMessage(msg.channel.id, 'That has been suggested! Thank you <@' + msg.author.id + '>!')
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'spoonfeed creator boi all teh ideas for commands',
        usage: '(idea)',
        cooldown: 30000
    }
}
'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'reportbug',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var reportbug = msg.content.split(' ').splice(1).join(' ')
            client.createMessage('474203545093013504', '**__' + msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ')' + ' reported the bug: __**' + reportbug)
            client.createMessage(msg.channel.id, 'The bug has been reported! <@' + msg.author.id + '>')
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Reports all teh bugs to AlekEagle!',
        usage: '(bug)',
        cooldown: 30000
    }
}
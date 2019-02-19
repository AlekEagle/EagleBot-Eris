'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'howcool',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var amountOfCool = 0;
            var howCoolCommand = msg.content.split(' ').splice(1).join(' ')
            if (howCoolCommand.includes('222882552472535041')) {
                amountOfCool = 200;
            }else {
                amountOfCool = Math.floor(Math.random() * 101);
            }
            if (amountOfCool === 0) {
                client.createMessage(msg.channel.id, howCoolCommand + ' is not cool.')
            }else {
                if (amountOfCool === 69) {
                    client.createMessage(msg.channel.id, howCoolCommand + ' is: ' + amountOfCool + '% cool ( ͡° ͜ʖ ͡°)\n' + '😎'.repeat(amountOfCool))
                }else {
                    client.createMessage(msg.channel.id, howCoolCommand + ' is: ' + amountOfCool + '% cool\n' + '😎'.repeat(amountOfCool))
                }
            }
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'howcool.',
        usage: '(literally anything)'
    }
}
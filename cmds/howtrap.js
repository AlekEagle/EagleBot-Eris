'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'howtrap',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var howTrapCommand = msg.content.split(' ').splice(1).join(' ')
            if (howTrapCommand.includes('69')) {
                amountOfTrap = 69;
            }else if (howTrapCommand.includes('348577384678686721')) {
                amountOfTrap = 100;
            }else {
                amountOfTrap = Math.floor(Math.random() * 101);
            }
            if (amountOfTrap === 0) {
                client.createMessage(msg.channel.id, howTrapCommand + ' is not a trap.')
            }else {
                if (amountOfTrap === 69) {
                    client.createMessage(msg.channel.id, howTrapCommand + ' is: ' + amountOfTrap + '% trap ( ͡° ͜ʖ ͡°)\n' + '⬛'.repeat(amountOfTrap))
                }else {
                    client.createMessage(msg.channel.id, howTrapCommand + ' is: ' + amountOfTrap + '% trap\n' + '⬛'.repeat(amountOfTrap))
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
        fullDescription: 'howtrap.',
        usage: '(literally anything)'
    }
}
'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'payrespects',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var f = msg.content.split(' ').splice(1).join(' ');
            var payedRespects = '';
            msg.channel.createMessage(`ALRIGHT PEOPLE, ${msg.author.username} Asked us to pay respects to **${f}** So do that by pressing F.`).then((message) => {
                message.addReaction('🇫')
                client.on('messageReactionAdd', (mossage, emoji, userID) => {
                    if (mossage.id === message.id && emoji.name === '🇫' && payedRespects.includes(userID) === false && userID !== client.user.id) {
                        message.channel.createMessage(`**${client.users.get(userID).username}** paid respects to **${f}**`)
                        payedRespects = payedRespects + ',' + userID
                    }
                });
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
        fullDescription: 'Press F to Pay respects',
        usage: '(thing to pay respects to)',
        cooldown: 300000
    }
}
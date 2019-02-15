'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'say',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var sayMessage = args.join(' ');
            console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Made the bot say: ' + sayMessage);
            client.deleteMessage(msg.channel.id, msg.id).catch(() => {});
            return sayMessage;
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Makes the bot say what ever you want! (all messages are logged to prevent sneaky Billys)',
        usage: '(your message)'
    }
}
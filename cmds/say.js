'use strict';

let manager = require('../functions/blacklistManager');
const Logger = require('./functions/logger');
const console = new Logger();

module.exports = {
    name: 'say',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var sayMessage = args.join(' ');
            console.info(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Made the bot say: ' + sayMessage);
            client.deleteMessage(msg.channel.id, msg.id).catch(() => {});
            msg.channel.createMessage(sayMessage);
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Makes the bot say what ever you want! (all messages are logged to prevent sneaky Billys)',
        usage: '(your message)'
    }
}
'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'getemoji',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var emojiID = msg.content.split(' ').splice(1).join(' ').split(':').splice(2).join(':').replace(/>/g, '')
            var animated = msg.content.split(' ').splice(1).join(' ').split(':')[0].replace(/</g, '')
            if (emojiID.length == 0) {
                msg.channel.createMessage('This emoji is either not a custom emoji, or is not accessable.');
            }else {
                client.createMessage(msg.channel.id, {
                    embed: {
                        title: 'Custom Server Emoji (click here for link to emoji)',
                        url: `https://cdn.discordapp.com/emojis/${emojiID}.${animated ? 'gif' : 'png'}?v=1`,
                        image: {
                            url: `https://cdn.discordapp.com/emojis/${emojiID}.${animated ? 'gif' : 'png'}?v=1`
                        }
                    }
                });
            }
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'retrieves custom server emojis.',
        usage: '(custom emoji or emoji id)'
    }
}
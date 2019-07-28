'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'poll',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (msg.member.permission.has('manageMessages')) {
                var options = msg.content.split(' ').splice(1).join(' ').split('|')
                var channel = ''
                if (options[3] !== undefined) {
                    channel = options[3].replace(/<#/g, '').replace(/>/g, '').replace(/ /g, '')
                }else {
                    channel = msg.channel.id
                }
                client.createMessage(channel, {
                    content: `${msg.author.username}#${msg.author.discriminator} has made a new poll \`${options[0]}\`\n:thumbsup: for: ${options[1]}\n:thumbsdown: for: ${options[2]}`,
                    disableEveryone: false
                }).then((message) => {
                    client.addMessageReaction(message.channel.id, message.id, '👍')
                    client.addMessageReaction(message.channel.id, message.id, '👎')
                }, () => {
                    client.createMessage(msg.channel.id, 'I can\'t say anything there so oof')
                });
            }else if (owners.isOwner(msg.author.id)) {
                var options = msg.content.split(' ').splice(1).join(' ').split('|')
                var channel = ''
                if (options[3] !== undefined) {
                    channel = options[3].replace(/<#/g, '').replace(/>/g, '').replace(/ /g, '')
                }else {
                    channel = msg.channel.id
                }
                client.createMessage(channel, {
                    content: `${msg.author.username}#${msg.author.discriminator} has made a new poll \`${options[0]}\`\n:thumbsup: for: ${options[1]}\n:thumbsdown: for: ${options[2]}`,
                    disableEveryone: false
                }).then((message) => {
                    client.addMessageReaction(message.channel.id, message.id, '👍')
                    client.addMessageReaction(message.channel.id, message.id, '👎')
                }, () => {
                    client.createMessage(msg.channel.id, 'I can\'t say anything there so oof')
                });
            }else {
                client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
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
        fullDescription: 'creates a poll',
        usage: '(question) | (option 1) | (option 2) | [channel]'
    }
}
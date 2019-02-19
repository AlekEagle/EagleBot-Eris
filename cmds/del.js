'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'del',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (msg.member.permission.has('manageMessages') || owners.isOwner(msg.author.id)) {
                var num2Delete = 0;
                if (args[0] === undefined) {
                    num2Delete = 50;
                }else {
                    num2Delete = parseInt(args[0]);
                }
                msg.channel.getMessages(num2Delete + 1).then((message) => {
                    client.deleteMessages(msg.channel.id, message.map(m => m.id), msg.author.username + '#' + msg.author.discriminator + ' deleted' + num2Delete.toString() + 'plus original message.').then(() => {
                        client.createMessage(msg.channel.id, 'Deleted ' + num2Delete.toString() + ' messages! 👍').then((message) => {
                            setTimeout(() => {
                                client.deleteMessage(msg.channel.id, message.id, 'Deleted response message.')
                            }, 5000)
                        })
                    }, (reason) => {
                        console.error(reason);
                        client.createMessage(msg.channel.id, 'Unable to delete messages. I may not have the `MANAGE_MESSAGES` permission. If I do have the permission, there may be some messages that are older than 2 weeks old.')
                    })
                })
            }else {
                client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
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
        fullDescription: 'Deletes a certian amount of messages. (requires permission `MANAGE_MESSAGES`)',
        usage: '(number of messages to delete|leave blank for 50)'
    }
}
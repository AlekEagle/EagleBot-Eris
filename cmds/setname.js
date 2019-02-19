'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'setname',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (owners.isOwner(msg.author.id)) {
                client.editSelf({
                    username: msg.content.split(' ').splice(1).join(' ').replace(/ /g, '_')
                })
                return 'My name is now ' + msg.content.split(' ').splice(1).join(' ').replace(/ /g, '_')
            }else {
                client.createMessage(msg.channel.id, 'You need the permission `BOT_OWNER` to use this command!')
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
        fullDescription: 'changes my name! (bot owner only)',
        hidden: true
    }
}
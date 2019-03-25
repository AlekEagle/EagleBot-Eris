'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'unban',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (msg.member.permission.has('banMembers') || owners.isOwner(msg.author.id)) {
                var unban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
                client.unbanGuildMember(msg.channel.guild.id, unban[0], msg.content.split(' ').splice(2).join(' '))
                msg.channel.createMessage('Demoted '+ msg.content.split(' ').splice(1).join(' ') + 'to Unbanned Member.');
            }else {
                client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
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
        fullDescription: 'Unbans users. (requires permission `BAN_MEMBERS`)',
        usage: '(ID) (reason)'
    }
}
'use strict';

let nums = require('../functions/numbers');
let owners = require('../functions/getOwners');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'setnick',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (msg.member.permission.has('manageNicknames') || owners.isOwner(msg.author.id)) {
                var userID = args[0].replace(/<@/g, '').replace(/>/g, '').replace(/!/g, '')
                var nickToSetTo = args.slice(1).join(' ')
                client.editGuildMember(msg.channel.guild.id, userID, {
                    nick: nickToSetTo
                }, msg.author.username + '#' + msg.author.discriminator + ' changed nickname').then(() => {
                        client.createMessage(msg.channel.id, `Changed ${msg.channel.guild.members.get(userID).username}#${msg.channel.guild.members.get(userID).discriminator}'s nickname to ${nickToSetTo}`)
                    }, (reason) => {
                        client.createMessage(msg.channel.id, 'Failed to set the nickname. Do I have the permission to do that?') 
                    });
            }else {
                client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_NICKNAMES`.')
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
        fullDescription: 'Changes nickname of a user. (requires permission MANAGE_NICKNAMES) (Command is finicky, cause unknown)',
        usage: '(user mention|user id) (nickname|blank to reset)'
        
    }
}
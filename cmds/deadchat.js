'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'deadchat',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var channelID = ''
            if (msg.content.split(' ').splice(1) !== undefined) {
                try{
                    channelID = msg.channel.guild.channels.get(msg.content.split(' ').splice(1).join(' ').replace(/<#/g, '').replace(/>/g, '')).name
                }catch(err) {
                    channelID = ''
                }
            }
            client.createMessage(msg.channel.id, `*A strange and spooky silence falls over ${channelID ? channelID : msg.channel.name} as everyone stopped typing and most likely died*`)
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Engraves the fact that chat is dead and nothing will change that.',
        usage: '[channel mention|channel id]'
    }
}
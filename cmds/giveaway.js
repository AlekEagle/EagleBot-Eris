'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'giveaway',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (msg.member.permission.has('manageMessages') || owners.isOwner(msg.author.id)) {
                var args = msg.content.split(' ').splice(1).join(' ').split('|')
                var channelID = ''
                if (args[2] !== undefined) {
                    channelID = args[2].replace(/<#/g, '').replace(/>/g, '').replace(/ /g, '')
                }else {
                    channelID = msg.channel.id
                }
                if (parseInt(args[1]) < 432000) {
                    client.createMessage(channelID, `${msg.author.username} has created a giveaway!\nThe reward for winning is ${args[0]}!\nThe giveaway will last ${args[1]} seconds!\nReact with 🎉 to enter!`).then((msg) => {
                        msg.addReaction('🎉')
                        setTimeout(() => {
                            msg.getReaction('🎉').then(re => {
                                re = re.filter(re => re.id !== client.user.id)
                                if (re[1] !== undefined) {
                                    msg.channel.createMessage(`<@${re[Math.floor(Math.random() * re.length)].id}> has won ${args[0]}!`)
                                }else {
                                    msg.channel.createMessage(`Hmmm.. it looks like no one won ${args[0]}. This is so sad Alexa play Despacito by Luis Fonsi.`)
                                }
                            })
                        }, parseInt(args[1]) * 1000)
                    })
                }else {
                    msg.channel.createMessage('I can\'t handle that long to wait for a giveaway, sorry!')
                }
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
        fullDescription: 'Create Giveaways!',
        usage: '(item to win)|(time in seconds)|[channel]'
    }
}
'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'warning',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var warnedUser = ''
            var reason = ''
            if (args[0].includes('<@')) {
                warnedUser = msg.channel.guild.members.get(args[0].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''))
            }else {
                warnedUser = msg.channel.guild.members.find(m => m.username === args[0])
            }
            if (args.slice(1).join(' ') === '') {
                reason = 'No Reason.'
            }else {
                reason = args.slice(1).join(' ')
            }
            if (msg.member.permission.has('kickMembers')) {
                if (msg.channel.guild.channels.find(c => c.name === 'warnings-and-bans') === undefined) {
                    msg.channel.createMessage('Your server does not have a channel called `warnings-and-bans`! to use this command, please create a channel called warnings and bans! (P.S. creating the channel will also enable ban and unban alerts!)')
                }else {
                    msg.channel.guild.channels.find(c => c.name === "warnings-and-bans").createMessage({
                        embed: {
                            author: {
                                name: `${msg.member.username}#${msg.member.discriminator}`,
                                icon_url:  msg.member.avatarURL
                            },
                            title: 'New Warning',
                            color: 16776960,
                            footer: {
                                icon_url: warnedUser.avatarURL,
                                text: `Warned ${warnedUser.username}#${warnedUser.discriminator}`
                            },
                            fields: [
                                {
                                    name: `User`,
                                    value: `${warnedUser.username}#${warnedUser.discriminator}`,
                                    inline: true
                                },
                                {
                                    name: 'Moderator / Admin',
                                    value: `${msg.member.username}#${msg.member.discriminator}`,
                                    inline: true
                                },
                                {
                                    name: 'Reason',
                                    value: reason
                                }
                            ]
                        }
                    });
                }
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
        fullDescription: 'Used to warn users who are miss behaving! (you\'ll need to make a channel called \'warnings-and-bans\' creating that and allowing the bot audit log access will allow the bot to log bans aswell)',
        aliases: [
            'warn'
        ]
    }
}
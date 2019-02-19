'use strict';

let manager = require('../functions/blacklistManager');
const u_wut_m8 = require('../.auth.json');
const DBL = require('dblapi.js');
const dbl = new DBL(u_wut_m8.dblToken, {});

module.exports = {
    name: 'dbl',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var botID = msg.content.split(' ').splice(1).join(' ').replace(/<@/ig, '').replace(/!/g, '').replace(/>/g, '');
            if (client.users.get(botID).bot === true) {
                dbl.getBot(botID).then(bot => {
                    var type = '';
                    if (client.users.get(bot.id).avatarURL.includes('gif')) {type = 'gif'}else {type = 'png'}
                    client.createMessage(msg.channel.id, {
                        embed: {
                            title: 'Discord Bot List Bot Info',
                            url: `https://discordbots.org/bot/${botID}`,
                            thumbnail: {
                                url: client.users.get(bot.id).dynamicAvatarURL(type, 512).split('?')[0]
                            },
                            fields: [
                                {
                                    name: 'Username',
                                    value: `${bot.username}#${bot.discriminator}`,
                                    inline: true
                                },
                                {
                                    name: 'ID',
                                    value: bot.id,
                                    inline: true
                                },
                                {
                                    name: 'Owner(s)',
                                    value: `<@${bot.owners.join('>\n<@')}>`,
                                    inline: true
                                },
                                {
                                    name: 'Prefix',
                                    value: bot.prefix,
                                    inline: true
                                },
                                {
                                    name: 'Short Description',
                                    value: `${bot.shortdesc}`
                                },
                                {
                                    name: 'Bot Library',
                                    value: bot.lib,
                                    inline: true
                                },
                                {
                                    name: 'DBL Tags',
                                    value: bot.tags.join(', '),
                                    inline: true
                                },
                                {
                                    name: 'Added on',
                                    value: new Date(bot.date).toUTCString(),
                                    inline: true
                                },
                                {
                                    name: 'Links',
                                    value: `${bot.invite ? `[Invite](${bot.invite})` : '~~Invite~~'} | ${bot.support ? `[Support Server](https://discord.gg/${bot.support})` : '~~Support Server~~'} | ${bot.github ? `[GitHub Page](${bot.github})` : '~~GitHub Page~~'} | ${bot.website ? `[Website](${bot.website})` : '~~Website~~'}`
                                }
                            ],
                            image: {
                                url: `https://discordbots.org/api/widget/${botID}.png`
                            }
                        }
                    });
                }, err => {
                    client.createMessage(msg.channel.id, 'I don\'t think I see them on there, hmm.')
                    console.error(err)
                })
                
            }else {
                client.createMessage(msg.channel.id, '**🔴 WOOP WOOP 🔴 WE GOT AN IDIOT OVER HERE TRYING TO VIEW THE BOT PAGE OF A USER!**')
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
        fullDescription: 'gives info about other bots if they are on discordbots.org',
        usage: '(bot Mention)'
    }
}
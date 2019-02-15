'use strict';

let guildCount = require('../functions/getGuilds');

module.exports = {
    name: 'guildDelete',

    exec: (client, guild) => {
        client.sendChannelTyping('479721048296783883')
        var bots = guild.members.filter(m => m.bot).length;
        var notBots = guild.memberCount-bots;
        var percent = Math.floor((bots / guild.memberCount) * 100);
        guildCount.getGuildCount().then(guilds => {
            client.createMessage('479721048296783883', {
                embed: {
                    title: 'Server Leave Alert',
                    thumbnail: {
                        url: `${guild.dynamicIconURL('png', 512) ? guild.dynamicIconURL('png', 512).split('?')[0] : 'https://cdn.discordapp.com/avatars/503720029456695306/cb6bb2fc3e552a68064d06f808d71fa8.png'}`
                    },
                    author: {
                        name: `${client.users.get(guild.ownerID).username}#${client.users.get(guild.ownerID).discriminator}`,
                        icon_url: `${client.users.get(guild.ownerID).dynamicAvatarURL('png', 512).split('?')[0]}`,
                        url: `${client.users.get(guild.ownerID).dynamicAvatarURL('png', 512).split('?')[0]}`
                    },
                    fields: [
                        {
                            name: 'Guild Name',
                            value: guild.name,
                            inline: true
                        },
                        {
                            name: 'Guild ID',
                            value: guild.id,
                            inline: true
                        },
                        {
                            name: 'User to Bot Ratio',
                            value: `${notBots}:${bots}`,
                            inline: true
                        },
                        {
                            name: 'Bot Percentage',
                            value: `${percent}%`,
                            inline: true
                        },
                        {
                            name: 'Member Count',
                            value: guild.memberCount,
                            inline: true
                        },
                        {
                            name: 'Shard',
                            value: guild.shard.id,
                            inline: true
                        },
                        {
                            name: 'New Guild Count',
                            value: guilds,
                            inline: true
                        }
                    ],
                    footer: {
                        url: client.user.dynamicAvatarURL('png', 512).split('?')[0],
                        text: `${client.user.username}#${client.user.discriminator}`
                    }
                }
            }).catch(() => {
                client.createMessage('479721048296783883', {
                    embed: {
                        title: 'Server Leave Alert',
                        thumbnail: {
                            url: `${guild.dynamicIconURL('png', 512) ? guild.dynamicIconURL('png', 512).split('?')[0] : 'https://cdn.discordapp.com/avatars/503720029456695306/cb6bb2fc3e552a68064d06f808d71fa8.png'}`
                        },
                        author: {
                            name: `${client.users.get(guild.ownerID).username}#${client.users.get(guild.ownerID).discriminator}`,
                            icon_url: `${client.users.get(guild.ownerID).dynamicAvatarURL('png', 512).split('?')[0]}`,
                            url: `${client.users.get(guild.ownerID).dynamicAvatarURL('png', 512).split('?')[0]}`
                        },
                        fields: [
                            {
                                name: 'Guild Name',
                                value: guild.name,
                                inline: true
                            },
                            {
                                name: 'Guild ID',
                                value: guild.id,
                                inline: true
                            },
                            {
                                name: 'User to Bot Ratio',
                                value: `${notBots}:${bots}`,
                                inline: true
                            },
                            {
                                name: 'Bot Percentage',
                                value: `${percent}%`,
                                inline: true
                            },
                            {
                                name: 'Member Count',
                                value: guild.memberCount,
                                inline: true
                            },
                            {
                                name: 'Shard',
                                value: guild.shard.id,
                                inline: true
                            },
                            {
                                name: 'New Guild Count',
                                value: guilds,
                                inline: true
                            }
                        ],
                        footer: {
                            url: client.user.dynamicAvatarURL('png', 512).split('?')[0],
                            text: `${client.user.username}#${client.user.discriminator}`
                        }
                    }
                })
            });
        });
    }
}
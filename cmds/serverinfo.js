'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'serverinfo',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var emojis = msg.channel.guild.emojis.map(e => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`).join(', ');
            client.createMessage(msg.channel.id, 'Alright, Lemme open Inspect Element on this server').then((message) => {
                client.sendChannelTyping(msg.channel.id)
                var createdat = new Date(msg.channel.guild.createdAt);
                var notifs = '';
                var explicit = '';
                var afk = '';
                try {
                    afk = msg.channel.guild.channels.get(msg.channel.guild.afkChannelID).name
                }catch (err) {
                    afk = 'Not set'
                }
                var sysChan = '';
                try {
                    sysChan = msg.channel.guild.channels.get(msg.channel.guild.systemChannelID).name
                }catch (err) {
                    sysChan = 'Not set'
                }
                var verifLev = '';
                if (msg.channel.guild.verificationLevel === 0) {verifLev = 'NONE'}else if(msg.channel.guild.verificationLevel === 1) {verifLev = 'LOW'}else if (msg.channel.guild.verificationLevel === 2) {verifLev = 'MEDIUM'}else if (msg.channel.guild.verificationLevel === 3) {verifLev = '(╯°□°）╯︵ ┻━┻'}else if (msg.channel.guild.verificationLevel === 4) {verifLev = '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'}
                if (msg.channel.guild.explicitContentFilter === 0) {explicit = 'Disabled'}else if (msg.channel.guild.explicitContentFilter === 1) {explicit = 'Filters content from indiviuals with no roles'}else if (msg.channel.guild.explicitContentFilter === 2) {explicit = 'Filters content from everyone'}
                if (msg.channel.guild.defaultNotifications === 0) {notifs = 'All messages'}else if (msg.channel.guild.defaultNotifications === 1) {notifs = 'Only @mentions'}
                var bots = msg.channel.guild.members.filter(m => m.bot).length;
                var notBots = msg.channel.guild.memberCount-bots;
                var percent = Math.floor((bots / msg.channel.guild.memberCount) * 100);
                client.editMessage(msg.channel.id, message.id, `Info for this server:\nName: \`${msg.channel.guild.name}\`\nServer ID: \`${msg.channel.guild.id}\`\nAFK Channel: \`${afk}\`\nAFK channel Timeout: \`${msg.channel.guild.afkTimeout ? msg.channel.guild.afkTimeout / 60 + ' minute(s)' : 'Not set'}\`\nServer creation date: \`${createdat}\`\nDefault Notification setting: \`${notifs}\``).then(() => {
                    client.createMessage(msg.channel.id, `Server emojis: ${emojis}`).then(() => {
                        client.createMessage(msg.channel.id, {
                            content: `Owner: \`${msg.channel.guild.members.get(msg.channel.guild.ownerID).username}#${msg.channel.guild.members.get(msg.channel.guild.ownerID).discriminator}\`\nExplicit Content Filter: \`${explicit}\`\nReal Users to Bots ratio (real users:bots): \`${notBots}:${bots}\`\nPercentage of server that are bots: \`${percent}%\`\nTotal Members combined: \`${msg.channel.guild.memberCount}\`\nIs the server large (250+ members): \`${msg.channel.guild.large}\`\nRegion: \`${msg.channel.guild.region}\`\n2FA required: \`${msg.channel.guild.mfaLevel ? 'true' : 'false'}\`\nVerification level: \`${verifLev}\`\nSystem channel (Built-in welcome messages): \`${sysChan}\`\nIcon: `,
                            embed: {
                                image: {
                                    url: msg.channel.guild.iconURL
                                }
                            }
                        });
                    });
                });
            });
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'shows info about the current server'
    }
}
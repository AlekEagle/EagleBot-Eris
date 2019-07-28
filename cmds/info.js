'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let guildCount = require('../functions/getGuilds');
let toHHMMSS = require('../functions/toReadableTime');

module.exports = {
    name: 'info',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var uptime = toHHMMSS(process.uptime().toString())
            var osUptime = toHHMMSS(require('os').uptime().toString())
            guildCount().then(guilds => {
                client.createMessage(msg.channel.id, {
                    embed: {
                        title: 'Basic Info',
                        description: 'Ummm... I\'m a Discord Bot.\n\n I was made by **__AlekEagle#0001__**\n\n*What else is there about me?* I use the Eris library\n\nThis right there ==> **__' + uptime + '__** is how long I\'ve been running.\n\nThe computer running me has been on for this ==> **__' + osUptime + '__**\n\nI\'m ran on a Raspberry Pi 3 B\n\nI\'m on DBL, here is the link: https://discordbots.org/bot/416274552126177282 \n\nI\'m in... uhh... let me check. Ok here it is: **__' + guilds + '__** servers.\n\nThe support server is https://discord.gg/72Px4Ag in the category "bot related stuff"\n\nUse `a}invite` to take a clone of me with you to your server\n\nI\'m using: **__' + Math.floor(process.memoryUsage().rss / 1024 / 1024) + 'MB__** of RAM\n\n**__' + nums.cmdsRan + '__** commands have been run since the last time I\'ve been rebooted.\n\n**__' + nums.msgsRead + '__** messages have been read since the last time I\'ve been rebooted.\n\nThat\'s all I know about myself.\n\nIf you want to see it be more organized on a website goto https://alekeagle.com/eaglenugget/info for that.'
                    }
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
        fullDescription: 'Shows basic info about me.',
        aliases: [
            'information'
        ]
    }
}
'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');
let guildCount = require('../functions/getGuilds');
let eco = require('../functions/economy');
let prefixes = require('../functions/getPrefixes');
let toHHMMSS = require('../functions/toReadableTime');

module.exports = {
    name: 'e9',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            ++nums.theGoodStuff
            var tags = msg.content.split(' ').splice(1).join('+')
            var e6search = {
                url: 'https://e926.net/post/index.json?tags=order:random+' + tags,
                headers: {
                    'User-Agent': `EagleBot-Eris/${process.version} (by CantCreative on e621)`
                }
            }
            client.sendChannelTyping(msg.channel.id)
            request(e6search, (error, res, body) => {
                if (!error && res.statusCode == 200) {
                    var e6searchResults = JSON.parse(body);
                    if(typeof (e6searchResults[0]) != "undefined") {
                        msg.channel.createMessage({
                            embed: {
                                title: 'e926 search results.  Votes: ' + e6searchResults[0].score,
                                url: 'https://e621.net/post/show/' + e6searchResults[0].id.toString(),
                                image: {
                                    url: e6searchResults[0].file_url.toString()
                                }
                            }
                        })
                    }else {
                        msg.channel.createMessage('I searched far and wide, and still found nothing.')
                    }
                }else {
                    msg.channel.createMessage('e926 didnt want to listen.')
                }
            });
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'you can search for safe furry stuff on here (BE WARNED THAT IT MAY NOT BE 100% SAFE ON HOW YOU INTERPRET IT!)',
        usage: '(search terms for stuff)',
        aliases: [
            'e926'
        ]
    }
}
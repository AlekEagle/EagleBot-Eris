'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let request = require('request');

module.exports = {
    name: 'e6',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var tags = msg.content.split(' ').splice(1).join('+')
            if (msg.channel.nsfw) {
                ++theGoodStuff
                var e6search = {
                    url: 'https://e621.net/post/index.json?tags=order:random+' + tags,
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
                                    title: 'e621 search results.  Votes: ' + e6searchResults[0].score,
                                    url: 'https://e621.net/post/show/' + e6searchResults[0].id.toString(),
                                    image: {
                                        url: e6searchResults[0].file_url.toString()
                                    }
                                }
                            })
                        }else {
                            msg.channel.createMessage('either your fetishes are weirder than the entirety of the internet, or you misspelled your search terms. either way, i found nothing')
                        }
                    }else {
                        msg.channel.createMessage('I tried talkin to e621, but they told me to fuk off')
                    }
                });
            }else {
                msg.channel.createMessage('I CAN\'T SHOW THAT STUFF HERE! THERE COULD BE KIDS HERE BOI')
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
        fullDescription: 'you can search for furry porn',
        usage: '(search terms for porn)',
        aliases: [
            'e621'
        ]
    }
}
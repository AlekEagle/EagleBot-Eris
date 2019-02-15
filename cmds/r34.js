'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'r34',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var tags = msg.content.split(' ').splice(1).join('+')
            try {
                if (msg.channel.nsfw) {
                    ++theGoodStuff
                    var r34search = {
                        url: 'https://rule34.xxx/index.php?page=dapi&q=index&limit=100&s=post&tags=' + tags + '&q=index',
                        headers: {
                            'User-Agent': `EagleBot-Eris/${process.version}`
                        }
                    }
                    client.sendChannelTyping(msg.channel.id)
                    request(r34search, (error, res, body) => {
                        if (!error && res.statusCode == 200) {
                            var r34searchResults = parser.xml2json(body);
                            var randomizer = parseInt(r34searchResults.posts.count)
                            if (randomizer > 100) {randomizer = 100}
                            if(typeof (r34searchResults) != "undefined" && r34searchResults.posts.count !== '0') {
                                var r34 = '';
                                var imgChooser = Math.floor(Math.random() * randomizer);
                                if (imgChooser === 100) {imgChooser = 99}
                                if (randomizer === 1) {r34 = r34searchResults.posts.post}else {r34 = r34searchResults.posts.post[imgChooser]}
                                msg.channel.createMessage({
                                    embed: {
                                        title: `rule34 search results. Votes: ${r34.score}`,
                                        url: 'https://rule34.xxx/index.php?page=post&s=view&id=' + r34.id,
                                        image: {
                                            url: r34.file_url
                                        }
                                    }
                                })
                            }else {
                                msg.channel.createMessage('either your fetishes are weirder than the entirety of the internet, or you misspelled your search terms. either way, i found nothing')
                            }
                        }else {
                            console.error(error)
                            console.error(res.statusCode)
                            msg.channel.createMessage('I tried talkin to rule34, but they told me to fuk off')
                        }
                    })
                }else {
                    msg.channel.createMessage('I CAN\'T SHOW THAT STUFF HERE! THERE COULD BE KIDS HERE BOI')
                }
            }catch (err) {
                client.createMessage(msg.channel.id, `AHH \`${tags.replace(/+/g, ' ')} IS TOO POWERFUL FOR ME TO HANDLE!!!!`)
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
        fullDescription: 'search for any kind of porn',
        usage: '(tag tag_with_spaces)',
        aliases: [
            'rule34'
        ]
    }
}
'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'meme',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var memeArgs = msg.content.split(' ').splice(1);
            switch(memeArgs[0]) {
                case 'savememe':
                    var saveMemeCommand = msg.content.split(' ').splice(2);
                    var meme2Save = msg.content.split(' ').splice(3).join(' ')
                    fs.open('./good_memes_probably/' + saveMemeCommand[0].toLowerCase() + '.meme', 'wx', (err, fd) => {
                        if (err) {
                            if (err.code === 'EEXIST') {
                                client.createMessage(msg.channel.id, 'Uhh, that meme is already taken boi, try `a}meme listmeme` to show what meme name are taken.')
                                console.error(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used meme savememe and failed to save a meme! name of meme: ' + saveMemeCommand[0])
                            }else {
                                client.createMessage(msg.channel.id, 'Well, unfortunately, an error occurred, but I don\'t quite know what to do with this error code: `' + err.code + '` so because of this error the meme will not be saved.')
                                console.error('An unknown error occurred!: ' + err.code)
                                console.error(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used meme savememe and failed to save a meme! name of meme: ' + saveMemeCommand[0])
                            }
                        }else {
                            fs.writeFile('./good_memes_probably/' + saveMemeCommand[0] + '.meme', meme2Save, (err) => {
                                if (err) {
                                    client.createMessage(msg.channel.id, 'Welp, an error occurred, and since an error occurred, I can\'t save the meme. ERROR CODE: `' + err.code + '`')
                                    console.error(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used meme savememe and failed to save a meme! name of meme: ' + saveMemeCommand[0])
                                }else {
                                    client.createMessage(msg.channel.id, 'saved your meme even though it sucks').then(() => {
                                if (err !== undefined) {
                                    fs.readdir('./good_memes_probably/', (err, files) => {
                                        clickbait('../node_server/root/eaglenugget/info/theinfostuff/memes.txt', files.join(', ').replace(/.meme/g, ''))
                                    });
                                }
                            });
                                    client.deleteMessage(msg.channel.id, msg.id).catch((reason) => {
                                        console.error('cant delete the meme');
                                    });
                                }
                            })
                        }
                    })
                break;
                case 'showmeme':
                    var showMemeCommand = msg.content.split(' ').splice(2)
                    fs.readFile('./good_memes_probably/' + showMemeCommand[0].toLowerCase() + '.meme', (err, data) => {
                        client.createMessage(msg.channel.id, `${err ? 'OOF error whoops! `' + err.code + '`' : 'dis da maymay you requested: ' + data.toString('utf8')}`)
                    });
                break;
                case 'listmeme':
                    return 'goto https://alekeagle.com/eaglenugget/info/memes for all of the memes.';
                break;
                case 'delmeme':
                    if (owners.isOwner(msg.author.id)) {
                        var delMemeCommand = msg.content.split(' ').splice(2)
                        fs.unlink('./good_memes_probably/' + delMemeCommand[0] + '.meme', function(err) {
                            client.createMessage(msg.channel.id, `${err ? 'OOF error whoops! ' + err.code : 'It\'s most likely gone, yeah I\'m pretty sure it\'s gone'}`).then(() => {
                                if (err !== undefined) {
                                    fs.readdir('./good_memes_probably/', (err, files) => {
                                    });
                                }
                            });
                        });
                    }else {
                        client.createMessage(msg.channel.id, 'You currently do not have the permission to use this! However, the owner of the bot is plotting a way to have the creator of the meme be albe to delete their own meme.')
                        console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Tried to use delmeme!');
                    }
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
        fullDescription: 'MEME STORAGE CENTER!',
        usage: '((savememe (name_of_meme) (contents of meme|link to picture for pictures))|(showmeme (name_of_meme))|(listmeme)|(owner only currently)(delmeme (name_of_meme))',
        aliases: [
            'maymay'
        ]
    }
}
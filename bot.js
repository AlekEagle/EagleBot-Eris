const Eris = require('eris');
const u_wut_m8 = require('./.auth.json');
const snekfetch = require('snekfetch');
const creatorID = '222882552472535041';
const client = new Eris.CommandClient(u_wut_m8.token, {
    disableEveryone: false
}, {
    description: 'EagleBot in Eris Form',
    owner: 'AlekEagle#6978',
    prefix: 'a}'
});
const fs = require('fs');
const sys = require('sys');
const exec = require('child_process').exec;
var timesCancerHasBeenCured = '0';
function puts(error, stdout, stderr) { sys.puts(stdout) }
var cmdsRan = 0;
var messagesRead = 0;
client.on('ready', () => {
    console.log('READY BOIIIIII')
    setInterval(() => {
        snekfetch.post(`https://discordbots.org/api/bots/stats`)
            .set('Authorization', u_wut_m8.dblToken)
            .send({ server_count: client.guilds.size })
            .then(() => console.log('Updated discordbots.org stats.'))
            .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
    }, 3600000)
});
client.on('guildCreate', () => {
    setInterval(() => {
        snekfetch.post(`https://discordbots.org/api/bots/stats`)
            .set('Authorization', u_wut_m8.dblToken)
            .send({ server_count: client.guilds.size })
            .then(() => console.log('Updated discordbots.org stats.'))
            .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
    }, 3600000)
});
client.on('guildDelete', () => {
    setInterval(() => {
        snekfetch.post(`https://discordbots.org/api/bots/stats`)
            .set('Authorization', u_wut_m8.dblToken)
            .send({ server_count: client.guilds.size })
            .then(() => console.log('Updated discordbots.org stats.'))
            .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
    }, 3600000)
});
client.on('messageCreate', () => {
    ++messagesRead
})
client.registerCommandAlias('hlep', 'help')
client.registerCommand('ping', (msg) => {
        var apiPingTime = '';
        ++cmdsRan
        exec('ping -c 1 104.16.59.5', function(error, stdout, stderr) {
            if (error != undefined) {
                console.log(error, stderr)
                apiPingTime = 'errored '
            }else {
                apiPingTime = stdout.split('time=').splice(1).join('').split('ms\n')
                apiPingTime = apiPingTime[0]
            }
                const then = Date.now();
                client.createMessage(msg.channel.id, 'Pinging...').then((message) => {
                    client.editMessage(msg.channel.id, message.id, 'Pong!\nMessage edit time: ' + (Date.now() - then) + ' ms\nAPI ping time: ' + apiPingTime + 'ms')
                })
            })
            console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used ping!');
        
    }, {
    description: 'it Pongs back to you.',
    fullDescription: 'it will pong when you say a}ping'
});
client.registerCommand('curecancer', (msg) => {
    cmdsRan = ++cmdsRan
    var rNG  = Math.floor(Math.random() * 100);
//                var rNG = 100;
    if (rNG < 99) {
        client.createMessage(msg.channel.id, ':skull: During your quest to cure cancer, you died from, *Ironically*, cancer, nice try, just so you know, cancer is uncureable, or is it?')
        console.log(rNG);
        console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used curecancer!');
    }else {
        client.createMessage(msg.channel.id, 'You somehow cured all types of cancer! <@' + msg.author.id + '> actually did it! *We all thought you were crazy*')
        console.log(rNG);
        fs.readFile('cancercured.txt', function(err, data) {
            var string = data.toString('utf8')
            var numForCancer = parseInt(string)
            fs.writeFile('cancercured.txt', ++numForCancer)
        });
    }
}, {
    description: 'Will cure cancer (sometimes)',
    fullDescription: 'This will cure cancer (not really), you have a 1 in 100 chance of it actually happening.'
});
client.registerCommand('setnick', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageNicknames')) {
        var nickToSetTo = msg.content.split(' ').splice(2).join(' ')
        client.editGuildMember(msg.channel.guild.id, msg.mentions[0].id, {
            nick: nickToSetTo
        }, msg.author.username + '#' + msg.author.discriminator + ' changed nickname')
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_NICKNAMES`.')
    }
}, {
    description: 'Changes nickname of a user.',
    fullDescription: 'Changes nickname of a user. (requires permission `MANAGE_NICKNAMES`)',
    usage: '<user mention> <nickname|blank to reset>'
    
})
client.registerCommand('cancercured', (msg) => {
    cmdsRan = ++cmdsRan
    fs.readFile('cancercured.txt', function(err, data) {
        if (err != undefined) {
            timesCancerHasBeenCured = '0'
        }else {
            timesCancerHasBeenCured = data.toString('utf8')
        }
        client.createMessage(msg.channel.id, 'cancer has been cured: ' + timesCancerHasBeenCured + ' times since me and AlekEagle started to keep track');
        console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used cancercured!');
    });
}, {
    description: 'Shows times cancer has been cured.',
    fullDescription: 'Will show the times cancer has been cured in all servers the bot is in.'
});
client.registerCommand('say', (msg) => {
    cmdsRan = ++cmdsRan
    var sayMessage = msg.content.split(' ').splice(1).join(' ').replace(/@everyone/ig, '(a)everyone');
    console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Made the bot say: ' + sayMessage);
    client.deleteMessage(msg.channel.id, msg.id).catch((reason) => {
        console.error(reason);
    });
    return sayMessage;
}, {
    description: 'Makes the bot say what ever you want!',
    fullDescription: 'Makes the bot say what ever you want! (all messages are logged to prevent sneaky Billys)',
    usage: '<your message>'
});
client.registerCommand('del', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageMessages')) {
        var num2Delete = 0;
        if (msg.content.split(' ').splice(1)[0] === undefined) {
            num2Delete = 50;
        }else {
            num2Delete = parseInt(msg.content.split(' ', 2).splice(1).toString());
        }
        msg.channel.getMessages(num2Delete + 1).then((message) => {
            client.deleteMessages(msg.channel.id, message.map(m => m.id), msg.author.username + '#' + msg.author.discriminator + ' deleted' + num2Delete.toString() + 'plus original message.').then(() => {
                client.createMessage(msg.channel.id, 'Deleted ' + num2Delete.toString() + ' messages! 👍').then((message) => {
                    setTimeout(() => {
                        client.deleteMessage(msg.channel.id, message.id, 'Deleted response message.')
                    }, 5000)
                })
            }, (reason) => {
                console.error(reason);
                client.createMessage(msg.channel.id, 'Unable to delete messages. I may not have the `MANAGE_MESSAGES` permission.')
            })
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
    }
}, {
    description: 'Deletes a certian amount of messages.',
    fullDescription: 'Deletes a certian amount of messages. (requires permission `MANAGE_MESSAGES`)',
    usage: '<number of messages to delete|leave blank for 50>'
});
client.registerCommand('revivechat', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('mentionEveryone') === true && msg.content.split(' ').splice(1).toString() === 'yes') {
        client.createMessage(msg.channel.id, '<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW @everyone WAKE UP!')
    }else if (msg.member.permission.has('mentionEveryone') === false && msg.content.split(' ').splice(1).toString() === 'yes') {
        client.createMessage(msg.channel.id, 'Unfortunately, you can not Ping everyone, since you do not have the permission, if you make `yes` blank or change `yes` to `no` then you can use the non ping everyone version.')
    }else if (msg.content.split(' ').splice(1)[0] === undefined) {
        client.createMessage(msg.channel.id, '<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW EVERYONE WAKE UP!')
    }else if (msg.content.split(' ').splice(1).toString() === 'no') {
        client.createMessage(msg.channel.id, '<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW EVERYONE WAKE UP!')
    }
    
}, {
    description: 'May or may not revive chat.',
    fullDescription: 'May or may not revive chat. (requires permission `MENTION_EVERYONE` to use arguement yes)',
    usage: '[yes|no|blank for no]'
});
client.registerCommand('deadchat', (msg) => {
    cmdsRan = ++cmdsRan
    return '*A strange and spooky silence falls over <#' + msg.channel.id + '> as everyone stopped typing and most likely died*'
}, {
    description: 'Engraves the fact that chat is dead and nothing will change that.'
});
client.registerCommand('grantrole', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageRoles')) {
        msg.channel.guild.members.get(msg.mentions[0].id).addRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' granted role')
        client.createMessage(msg.channel.id, 'Gave role!')
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_ROLES`.')
    }
}, {
    description: 'Gives role to user.',
    fullDescription: 'gives role to user (Must be able to mention/ping role! needs permission `MANAGE_ROLES`)',
    usage: '<Mention user> <Mention role>'
});
client.registerCommand('revokerole', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageRoles')) {
        msg.channel.guild.members.get(msg.mentions[0].id).removeRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' revoked role')
        client.createMessage(msg.channel.id, 'Took role!')
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_ROLES`.')
    }
}, {
    description: 'Removes the role from the user.',
    fullDescription: 'Removes the role from the user (Must be able to mention/ping role! needs permission `MANAGE_ROLES`)',
    usage: '<Mention user> <Mention role>'
});
client.registerCommand('setplaying', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.author.id === creatorID) {
        var args = msg.content.split(' ').splice(1);
        client.editStatus(args[0], {
            name: args[1].toString().replace(/_/g, ' '),
            type: parseInt(args[2])
        });
    }else {
        client.createMessage(msg.channel.id, 'You are not the creator!')
    }
}, {
    description: 'sets what the bot is playing.',
    fullDescription: 'sets what the bot is playing. (Owner only)',
    usage: '<status> <game name> <type>'
});
client.registerCommand('touch', (msg) => {
    cmdsRan = ++cmdsRan
    var touch = msg.content.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
    return '*Touched ' + touch + '*'
}, {
    description: 'Kinda kinky',
    usage: '<thing to succ>'
});
client.registerCommand('ban', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('banMembers')) {
        var ban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.banGuildMember(msg.channel.guild.id, ban[0], parseInt(ban[1]), msg.content.split(' ').splice(3).join(' '))
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
    }
}, {
    description: 'Bans users.',
    fullDescription: 'Bans users. (requires permission `BAN_MEMBERS`)',
    usage: '<@user> <days of messages to delete 0-7> <reason>'
});
client.registerCommand('unban', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('banMembers')) {
        var unban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.banGuildMember(msg.channel.guild.id, unban[0], msg.content.split(' ').splice(2).join(' '))
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
    }
}, {
    description: 'Unbans users.',
    fullDescription: 'Unbans users. (requires permission `BAN_MEMBERS`)',
    usage: '<ID> <reason>'
});
client.registerCommand('kick', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('kickMembers')) {
        var kick = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.kickGuildMember(msg.channel.guild.id, kick[0], msg.content.split(' ').splice(2).join(' '))
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `KICK_MEMBERS`.')
    }
}, {
    description: 'Kicks members.',
    fullDescription: 'Kicks members. (requires permission `KICK_MEMBERS`)',
    usage: '<@user> <reason>'
});
client.registerCommand('succ', (msg) => {
    cmdsRan = ++cmdsRan
    var succ = msg.content.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
    return '*Succed' + succ + '*'
}, {
    description: 'really gay uwu.',
    usage: '<thing to succ>'
});
client.registerCommand('meme', (msg) => {
    cmdsRan = ++cmdsRan
    var memeArgs = msg.content.split(' ').splice(1);
    switch(memeArgs[0]) {
        case 'savememe':
            var saveMemeCommand = msg.content.split(' ').splice(2);
            var meme2Save = msg.content.split(' ').splice(3).join(' ')
            fs.open('./good_memes_probably/' + saveMemeCommand[0] + '.meme', 'wx', (err, fd) => {
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
                            client.createMessage(msg.channel.id, 'saved your meme even though it sucks')
                            console.error(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Used meme savememe and successfully saved a meme! name of meme: ' + saveMemeCommand[0])
                            client.deleteMessage(msg.channel.id, msg.id).catch((reason) => {
                                console.error(reason);
                            });
                        }
                    })
                }
            })
        break;
        case 'showmeme':
            var showMemeCommand = msg.content.split(' ').splice(2)
            fs.readFile('./good_memes_probably/' + showMemeCommand[0] + '.meme', (err, data) => {
                client.createMessage(msg.channel.id, `${err ? 'OOF error whoops! `' + err.code + '`' : 'dis da maymay you requested: ' + data.toString('utf8')}`)
                console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') used showmeme!')
            });
        break;
        case 'listmeme':
            fs.readdir('./good_memes_probably/', (err, files) => {
                client.createMessage(msg.channel.id, 'The memes we have so far are: ' + files.join(', ').replace(/.meme/g, ''))
                console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') used listmeme!')
            })
        break;
        case 'delmeme':
            if (userID == creatorID) {
                var delMemeCommand = msg.content.split(' ').splice(2)
                fs.unlink('./good_memes_probably/' + delMemeCommand[0] + '.meme', function(err) {
                    client.createMessage(msg.channel.id, `${err ? 'OOF error whoops! ' + err.code : 'It\'s most likely gone, yeah I\'m pretty sure it\'s gone'}`)
                });
            }else {
                client.createMessage(msg.channel.id, 'You currently do not have the permission to use this! However, the owner of the bot is plotting a way to have the creator of the meme be albe to delete their own meme.')
                console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Tried to use delmeme!');
            }
    }
}, {
    description: 'MEME STORAGE CENTER!',
    usage: '`<<savememe <name_of_meme> <contents of meme|link to picture for pictures>>|<showmeme <name_of_meme>>|<listmeme>|(owner only currently)<delmeme <name_of_meme>>`'
});
client.registerCommandAlias('maymay', 'meme');
client.registerCommand('mute', (msg) => {
    var mute = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceMuteMembers')) {
        client.editGuildMember(msg.channel.guild.id, mute[0], {
            mute: true
        }, msg.author.username + '#' + msg.author.discriminator + ' muted ' + msg.channel.guild.members.get(mute[0]).username).then(() =>{
            client.createMessage(msg.channel.id, 'ok they am mute')
        }, () => {
            client.createMessage(msg.channel.id, 'Action failed, Do I have the permission: `MUTE_MEMBERS`?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MUTE_MEMBERS`.')
    }
})
client.registerCommand('unmute', (msg) => {
    var unmute = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceMuteMembers')) {
        client.editGuildMember(msg.channel.guild.id, unmute[0], {
            mute: false
        }, msg.author.username + '#' + msg.author.discriminator + ' unmuted ' + msg.channel.guild.members.get(unmute[0]).username).then(() =>{
            client.createMessage(msg.channel.id, 'ok they am unmuted')
        }, () => {
            client.createMessage(msg.channel.id, 'Action failed, Do I have the permission: `MUTE_MEMBERS`?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MUTE_MEMBERS`.')
    }
})
client.registerCommand('deafen', (msg) => {
    var deafen = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceDeafenMembers')) {
        client.editGuildMember(msg.channel.guild.id, deafen[0], {
            deaf: true
        }, msg.author.username + '#' + msg.author.discriminator + ' deafened ' + msg.channel.guild.members.get(deafen[0]).username).then(() =>{
            client.createMessage(msg.channel.id, 'ok they am deaf')
        }, () => {
            client.createMessage(msg.channel.id, 'Action failed, Do I have the permission: `DEAFEN_MEMBERS`?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `DEAFEN_MEMBERS`.')
    }
})
client.registerCommand('undeafen', (msg) => {
    var undeafen = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceDeafenMembers')) {
        client.editGuildMember(msg.channel.guild.id, undeafen[0], {
            deaf: false
        }, msg.author.username + '#' + msg.author.discriminator + ' undeafened ' + msg.channel.guild.members.get(undeafen[0]).username).then(() =>{
            client.createMessage(msg.channel.id, 'ok they am undeaf')
        }, () => {
            client.createMessage(msg.channel.id, 'Action failed, Do I have the permission: `DEAFEN_MEMBERS`?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `DEAFEN_MEMBERS`.')
    }
})
client.connect();
const Eris = require('eris');
const u_wut_m8 = require('./.auth.json');
const DBL = require('dblapi.js');
const creatorID = '222882552472535041,361773766256361472';
const client = new Eris.CommandClient(u_wut_m8.token, {}, {
    defaultHelpCommand: false,
    defaultImageFormat: 'png',
    description: 'EagleBot in Eris Form',
    owner: 'AlekEagle#6978',
    prefix: 'a}'
});
const dbl = new DBL(u_wut_m8.dblToken, {webhookPath: '/', webhookPort: 5000}, client);
const fs = require('fs');
const sys = require('sys');
const exec = require('child_process').exec;
const request = require('request');
var timesCancerHasBeenCured = '0';
function puts(error, stdout, stderr) { sys.puts(stdout) }
var cmdsRan = 0;
var messagesRead = 0;
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num /3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = hours+':'+minutes+':'+seconds;
    return time;
}
function notClickBait(channel, file, filename, content) {
    fs.readFile(file, (err, data) => {
        if (err != undefined) {
            client.createMessage(channel, 'An error occurred sending the file, this is the error code: `' + err.code + '`')
        }else {
            client.createMessage(channel, content, {
                file: data,
                name: filename
            });
        }
    });
}
client.on('ready', () => {
    console.log('THIS BOT IS READY BOIIIIII');
});
dbl.webhook.on('ready', hook => {
    console.log(`Webhook running with path ${hook.hostname}:${hook.port}${hook.path}`)
})
dbl.webhook.on('vote', vote => {
    client.getDMChannel(vote.user).then((message) => {
        message.createMessage('Thank you so much for voting!');
    });
    console.log('someone voted!');
});
dbl.on('posted', () => {
    console.log('yeet!!!! Server count posted')
});
client.on('messageCreate', (message) => {
    ++messagesRead
    if (message.content === '<@' + client.user.id + '>') {
        var prefix = ''
        if (require('util').inspect(client.guildPrefixes) === '{}') {prefix = 'a}'}else {prefix = require('util').inspect(client.guildPrefixes.splice(1)).replace(/{/g, '').replace(/}/g, '').replace(/'/g, '').replace(/:/g, ', ');}
        client.createMessage(message.channel.id, 'My prefix here is: `' + prefix + '`')
    }
    if (message.content.substring(0, 2) === 'a}' && message.content.split('').splice(2).join('').split(' ')[0] === 'rape' && message.author.bot === false) {
        client.createMessage(message.channel.id, message.content.split(' ').splice(1).join(' ') + ' has been raped!!!!!!')
    }
});
client.registerCommand('ping', (msg) => {
        var apiPingTime = '';
        cmdsRan = ++cmdsRan
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
    description: ' ',
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
    description: ' ',
    fullDescription: 'This will cure cancer (not really), you have a 1 in 100 chance of it actually happening.'
});
client.registerCommand('setnick', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageNicknames')) {
        var userID = msg.content.split(' ').splice(1)[0].replace(/<@&/g, '').replace(/>/g, '')
        var nickToSetTo = msg.content.split(' ').splice(2).join(' ')
        client.editGuildMember(msg.channel.guild.id, userID, {
            nick: nickToSetTo
        }, msg.author.username + '#' + msg.author.discriminator + ' changed nickname').then(() => {
                client.createMessage(msg.channel.id, `Changed ${msg.channel.guild.members.get(userID).username}#${msg.channel.guild.members.get(userID).discriminator}'s nickname to ${nickToSetTo}`)
            }, (reason) => {
                client.createMessage(msg.channel.id, 'Failed to set the nickname. Do I have the permission to do that?') 
            });
    }else {
        if (creatorID.includes(msg.author.id)) {
            var userID = msg.content.split(' ').splice(1)[0].replace(/<@&/g, '').replace(/>/g, '')
            var nickToSetTo = msg.content.split(' ').splice(2).join(' ')
            client.editGuildMember(msg.channel.guild.id, userID, {
                nick: nickToSetTo
            }, msg.author.username + '#' + msg.author.discriminator + ' changed nickname').then(() => {
                client.createMessage(msg.channel.id, `Changed ${msg.channel.guild.members.get(userID).username}#${msg.channel.guild.members.get(userID).discriminator}'s nickname to ${nickToSetTo}`)
            }, (reason) => {
                client.createMessage(msg.channel.id, 'Failed to set the nickname. Do I have the permission to do that?') 
            });
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_NICKNAMES`.')
        }
    }
}, {
    description: ' ',
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
    description: ' ',
    fullDescription: 'Will show the times cancer has been cured in all servers the bot is in.'
});
client.registerCommand('say', (msg) => {
    cmdsRan = ++cmdsRan
    var sayMessage = msg.content.split(' ').splice(1).join(' ').replace(/@everyone/ig, '(a)everyone');
    console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Made the bot say: ' + sayMessage);
    client.deleteMessage(msg.channel.id, msg.id).catch((reason) => {
        console.error('oof cant delete the message that someone made me say, they aint so secret anymore');
    });
    return sayMessage;
}, {
    description: ' ',
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
                client.createMessage(msg.channel.id, 'Unable to delete messages. I may not have the `MANAGE_MESSAGES` permission. If I do have the permission, there may be some messages that are older than 2 weeks old.')
            })
        })
    }else {
        if (creatorID.includes(msg.author.id)) {
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
    }
}, {
    description: ' ',
    fullDescription: 'Deletes a certian amount of messages. (requires permission `MANAGE_MESSAGES`)',
    usage: '<number of messages to delete|leave blank for 50>'
});
client.registerCommand('revivechat', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('mentionEveryone') === true && msg.content.split(' ').splice(1).toString() === 'yes' && msg.author.id !== '282993398296739841') {
        client.createMessage(msg.channel.id, {
            content:'<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW @everyone WAKE UP!',
            disableEveryone: false
        });
    }else if (msg.member.permission.has('mentionEveryone') === false && msg.content.split(' ').splice(1).toString() === 'yes') {
        client.createMessage(msg.channel.id, 'Unfortunately, you can not Ping everyone, since you do not have the permission, if you make `yes` blank or change `yes` to `no` then you can use the non ping everyone version.')
    }else if (msg.content.split(' ').splice(1)[0] === undefined) {
        client.createMessage(msg.channel.id, '<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW EVERYONE WAKE UP!')
    }else if (msg.content.split(' ').splice(1).toString() === 'no') {
        client.createMessage(msg.channel.id, '<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW EVERYONE WAKE UP!')
    }else if (creatorID.includes(msg.author.id) && msg.content.split(' ').splice(1).toString() === 'yes') {
        client.createMessage(msg.channel.id, {
            content:'<@' + msg.author.id + '> used Revive Chat! It\'s super effective! NOW @everyone WAKE UP!',
            disableEveryone: false
        });
    }
    
}, {
    description: ' ',
    fullDescription: 'May or may not revive chat. (requires permission `MENTION_EVERYONE` to use arguement yes)',
    usage: '[yes|no|blank for no]'
});
client.registerCommand('deadchat', (msg) => {
    cmdsRan = ++cmdsRan
    var channelID = ''
    if (msg.content.split(' ').splice(1) !== undefined) {
        try{
            channelID = msg.channel.guild.channels.get(msg.content.split(' ').splice(1).join(' ').replace(/<#/g, '').replace(/>/g, '')).name
        }catch(err) {
            channelID = ''
        }
    }
    client.createMessage(msg.channel.id, `*A strange and spooky silence falls over ${channelID ? channelID : msg.channel.name} as everyone stopped typing and most likely died*`)
    
    
}, {
    description: ' ',
    fullDescription: 'Engraves the fact that chat is dead and nothing will change that.'
});
client.registerCommand('grantrole', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageRoles')) {
        msg.channel.guild.members.get(msg.mentions[0].id).addRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' granted role').then(() => {
            client.createMessage(msg.channel.id, 'Gave role!')
        }, () => {
            client.createMessage(msg.channel.id, 'Failed, do I have permissions?')
        })
    }else {
        if (creatorID.includes(msg.author.id)) {
            msg.channel.guild.members.get(msg.mentions[0].id).addRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' granted role').then(() => {
                client.createMessage(msg.channel.id, 'Gave role!')
            }, () => {
                client.createMessage(msg.channel.id, 'Failed, do I have permissions?')
            })
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_ROLES`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'gives role to user (Must be able to mention/ping role! needs permission `MANAGE_ROLES`)',
    usage: '<Mention user> <Mention role>'
});
client.registerCommand('revokerole', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageRoles')) {
        msg.channel.guild.members.get(msg.mentions[0].id).removeRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' revoked role').then(() => {
            client.createMessage(msg.channel.id, 'Took role!')
        }, () => {
            client.createMessage(msg.channel.id, 'Failed, do I have permissions?')
        })
    }else {
        if (creatorID.includes(msg.author.id)) {
            msg.channel.guild.members.get(msg.mentions[0].id).removeRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' revoked role').then(() => {
                client.createMessage(msg.channel.id, 'Took role!')
            }, () => {
                client.createMessage(msg.channel.id, 'Failed, do I have permissions?')
            })
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_ROLES`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Removes the role from the user (Must be able to mention/ping role! needs permission `MANAGE_ROLES`)',
    usage: '<Mention user> <Mention role>'
});
client.registerCommand('setplaying', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        var playing = ''
        var args = msg.content.split(' ').splice(1);
        var text = msg.content.split(' ').splice(3).join(' ')
        var n = text.indexOf(' | ')
        text = text.substring(0, n != -1 ? n : text.length);
        if (parseInt(args[1]) === 0) {
            playing = '**Playing**'
        }else if (parseInt(args[1]) === 1) {
            playing = '**Streaming**'
        }else if (parseInt(args[1]) === 2) {
            playing = '**Listening to**'
        }else if (parseInt(args[1]) === 3) {
            playing = '**Watching**'
        }
        client.editStatus(args[0], {
            name: text,
            type: parseInt(args[1])
//            url: msg.content.split(' | ').splice(1).join('')
        })
        return 'I am now ' + playing + ' ' + text;

    }else {
        client.createMessage(msg.channel.id, 'You need the permission `BOT_OWNER` to use this command!')
    }
}, {
    description: ' ',
    fullDescription: 'sets what the bot is playing. (Owner only command)',
    usage: '<status> <game name> <type>'
});
client.registerCommand('touch', (msg) => {
    cmdsRan = ++cmdsRan
    var touch = msg.content.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
    return '*Touched ' + touch + '*'
}, {
    description: ' ',
    fullDescription: 'Kinda kinky',
    usage: '<thing to touch>'
});
client.registerCommand('ban', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('banMembers')) {
        var ban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.banGuildMember(msg.channel.guild.id, ban[0], parseInt(ban[1]), msg.content.split(' ').splice(3).join(' ')).then(() => {
            client.createMessage(msg.channel.id, 'Banned '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`)
        }, () => {
            client.createMessage(msg.channel.id, 'Failed, Do I have permissions?')
        })
        
    }else {
        if (creatorID.includes(msg.author.id)) {
            var ban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
            client.banGuildMember(msg.channel.guild.id, ban[0], parseInt(ban[1]), msg.content.split(' ').splice(3).join(' ')).then(() => {
                client.createMessage(msg.channel.id, 'Banned '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`)
            }, () => {
                client.createMessage(msg.channel.id, 'Failed, Do I have permissions?')
            })
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Bans users. (requires permission `BAN_MEMBERS`)',
    usage: '<@user> <days of messages to delete 0-7> <reason>'
});
client.registerCommand('unban', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('banMembers')) {
        var unban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.unbanGuildMember(msg.channel.guild.id, unban[0], msg.content.split(' ').splice(2).join(' '))
        return 'Unanned '+ msg.content.split(' ').splice(1).join(' ')
    }else {
        if (creatorID.includes(msg.author.id)) {
            var ban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
            client.unbanGuildMember(msg.channel.guild.id, unban[0],  msg.content.split(' ').splice(2).join(' '))
            return 'Unanned '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`;
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Unbans users. (requires permission `BAN_MEMBERS`)',
    usage: '<ID> <reason>'
});
client.registerCommand('kick', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('kickMembers')) {
        var kick = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.kickGuildMember(msg.channel.guild.id, kick[0], msg.content.split(' ').splice(2).join(' ')).then(() => {
            client.createMessage(msg.channel.id, 'Kicked '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`)
        }, () => {
            client.createMessage(msg.channel.id, 'Failed,  do I have permissions?')
        })
    }else {
        if (creatorID.includes(msg.author.id)) {
            var kick = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
            client.kickGuildMember(msg.channel.guild.id, kick[0], msg.content.split(' ').splice(2).join(' ')).then(() => {
                client.createMessage(msg.channel.id, 'Kicked '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`)
            }, () => {
                client.createMessage(msg.channel.id, 'Failed,  do I have permissions?')
            })
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `KICK_MEMBERS`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Kicks members. (requires permission `KICK_MEMBERS`)',
    usage: '<@user> <reason>'
});
client.registerCommand('succ', (msg) => {
    cmdsRan = ++cmdsRan
    var succ = msg.content.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
    return '*Succed ' + succ + '*'
}, {
    description: ' ',
    fullDescription: 'really gay uwu.',
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
            if (creatorID.includes(msg.author.id)) {
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
    description: ' ',
    fullDescription: 'MEME STORAGE CENTER!',
    usage: '`<<savememe <name_of_meme> <contents of meme|link to picture for pictures>>|<showmeme <name_of_meme>>|<listmeme>|(owner only currently)<delmeme <name_of_meme>>`'
});
client.registerCommandAlias('maymay', 'meme');
client.registerCommand('mute', (msg) => {
    cmdsRan = ++cmdsRan
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
        if (creatorID.includes(msg.author.id)) {
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
    }
}, {
    description: ' ',
    fullDescription: 'Server mutes user (requires permission `MUTE_MEMBERS`)',
    usage: '<@user>'
})
client.registerCommand('unmute', (msg) => {
    cmdsRan = ++cmdsRan
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
        if (creatorID.includes(msg.author.id)) {
            client.editGuildMember(msg.channel.guild.id, unmute[0], {
                mute: false
            }, msg.author.username + '#' + msg.author.discriminator + ' unmuted ' + msg.channel.guild.members.get(unmute[0]).username).then(() =>{
                client.createMessage(msg.channel.id, 'ok they am unmute')
            }, () => {
                client.createMessage(msg.channel.id, 'Action failed, Do I have the permission: `MUTE_MEMBERS`?')
            })
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MUTE_MEMBERS`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Server unmutes user (if previously muted) (requires permission `MUTE_MEMBERS`)',
    usage: '<@user>'
})
client.registerCommand('deafen', (msg) => {
    cmdsRan = ++cmdsRan
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
        if (creatorID.includes(msg.author.id)) {
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
    }
}, {
    description: ' ',
    fullDescription: 'Server deafens user (requires permission `DEAFEN_MEMBERS`)',
    usage: '<@user>'
})
client.registerCommand('undeafen', (msg) => {
    cmdsRan = ++cmdsRan
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
        if (creatorID.includes(msg.author.id)) {
            client.editGuildMember(msg.channel.guild.id, deafen[0], {
                deaf: false
            }, msg.author.username + '#' + msg.author.discriminator + ' undeafened ' + msg.channel.guild.members.get(deafen[0]).username).then(() =>{
                client.createMessage(msg.channel.id, 'ok they am undeaf')
            }, () => {
                client.createMessage(msg.channel.id, 'Action failed, Do I have the permission: `DEAFEN_MEMBERS`?')
            })
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `DEAFEN_MEMBERS`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Server undeafens user (if previously deafened)',
    usage: '<@user>'
});
client.registerCommand('github', () => {
    cmdsRan = ++cmdsRan
    return 'here you go: https://github.com/AlekEagleYT/EagleBot-Eris';
}, {
    description: ' ',
    fullDescription: 'My GitHub page.'
});
client.registerCommand('invite', () => {
    cmdsRan = ++cmdsRan
    return 'here you go: https://discordapp.com/api/oauth2/authorize?client_id=416274552126177282&permissions=482868295&scope=bot';
}, {
    description: ' ',
    fullDescription: 'Invite me!'
});
client.registerCommand('emojify', (msg) => {
    cmdsRan = ++cmdsRan
    var emojify = msg.content.split(' ').splice(1).join(' ').replace(/ /g, '    ').replace(/ab/ig, '🆎 ').replace(/a/ig, '🅰️ ').replace(/b/ig, '🅱️ ').replace(/c/ig, '🇨 ').replace(/d/ig, '🇩 ').replace(/e/ig, '🇪 ').replace(/f/ig, '🇫 ').replace(/g/ig, '🇬 ').replace(/h/ig, '🇭 ').replace(/i/ig, '🇮 ').replace(/j/ig, '🇯 ').replace(/k/ig, '🇰 ').replace(/l/ig, '🇱 ').replace(/m/ig, '🇲 ').replace(/n/ig, '🇳 ').replace(/p/ig, '🇵 ').replace(/q/ig, '🇶 ').replace(/s/ig, '🇸 ').replace(/t/ig, '🇹 ').replace(/u/ig, '🇺 ').replace(/v/ig, '🇻 ').replace(/w/ig, '🇼 ').replace(/x/ig, '🇽 ').replace(/y/ig, '🇾 ').replace(/z/ig, '🇿 ').replace(/r/ig, '🇷 ').replace(/o/ig, '🅾️ ').replace(/0/ig, ':zero:').replace(/1/ig, ':one:').replace(/2/ig, ':two:').replace(/3/ig, ':three:').replace(/4/ig, ':four:').replace(/5/ig, ':five:').replace(/6/ig, ':six:').replace(/7/ig, ':seven:').replace(/8/ig, ':eight:').replace(/9/ig, ':nine:').replace(/!/ig, '❗').replace('?', '❓');
    return emojify;
}, {
    description: ' ',
    fullDescription: 'Turns normal letters into emojis!'
});
client.registerCommand('info', () => {
    cmdsRan = ++cmdsRan
    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();
    var osTime = require('os').uptime();
    var osUptime = (osTime + "").toHHMMSS();
    return 'Ummm... I\'m a Discord Bot.\n I was made by **__AlekEagle#6978__**\n*What else is there about me?* I use the Eris library\nThis right there ==> **__' + uptime + '__** is how long I\'ve been running.\nThe computer running me has been on for this ==> **__' + osUptime + '__**\nI\'m ran on a Raspberry Pi 3 B\nI\'m on Discord Bot List, here is the link: https://discordbots.org/bot/416274552126177282 \nI\'m in... uhh... let me check. Ok here it is: **__' + client.guilds.size + '__** servers.\nThe support server is https://discord.gg/72Px4Ag in the category "bot related stuff"\nUse `a}invite` to take a clone of me with you to your server\nI\'m using: **__' + Math.floor(process.memoryUsage().rss / 1024 / 1024) + 'MB__** of RAM\n**__' + cmdsRan + '__** commands have been run since the last time I\'ve been rebooted.\n**__' + messagesRead + '__** messages have been read since the last time I\'ve been rebooted.\nThat\'s all I know about myself.'
}, {
    description: ' ',
    fullDescription: 'shows basic info about me.'
});
client.registerCommandAlias('information', 'info')
client.registerCommand('reboot', (msg) => {
    if (creatorID.includes(msg.author.id)) {
        client.createMessage(msg.channel.id, 'Goodbye cruel world :gun:')
        setTimeout(() => {
            process.exit(0);
        }, 5000)
    }else {
        client.createMessage(msg.channel.id, 'You need the permission `BOT_OWNER` to use this command!')
    }
}, {
    description: ' ',
    fullDescription: 'Reboots the bot (owner only command)'
});
client.registerCommandAlias('restart', 'reboot');
client.registerCommandAlias('reboit', 'reboot');
client.registerCommand('eval', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        try {
            var evalCommand = msg.content.split(' ').splice(1).join(' ');
            let evaluation = eval(evalCommand);
            if (typeof evaluation !== "string") {
                evaluation = require('util').inspect(evaluation)
            }
            if (evaluation.length > 2000) {
                client.createMessage(msg.channel.id, 'Output too large, please wait while I pack the output into a file.').then(() => {
                    fs.writeFile('eval_output.txt', evaluation, (err) => {
                        if (err != undefined) {
                            client.createMessage(msg.channel.id, 'An error occurred while this action was being preformed error code: `' + err.code + '`')
                        }else {
                            fs.readFile('./eval_output.txt', (err, data) => {
                                client.createMessage(msg.channel.id, 'Output from eval: ', {
                                    file: data,
                                    name: 'eval_output.txt'
                                }).then(() => {
                                    fs.unlink('./eval_output.txt')
                                });
                            });
                        }
                    });
                });
            }else {
                client.createMessage(msg.channel.id, evaluation)
            }
        } catch (err) {
            client.createMessage(msg.channel.id, 'OOF ERROR:\ninput: ```' + evalCommand + '``` output: ```' + err + '```')
        }
    }else {
        return 'You need the permission `BOT_OWNER` to use this command!';
    }
}, {
    description: ' ',
    fullDescription: 'Evaluates code with a command (owner only)'
});
client.registerCommandAlias('evaluate', 'eval');
client.registerCommandAlias('ev', 'eval');
client.registerCommand('reportbug', (msg) => {
    cmdsRan = ++cmdsRan
    var reportbug = msg.content.split(' ').splice(1).join(' ')
    client.createMessage('474203545093013504', '**__' + msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ')' + ' reported the bug: __**' + reportbug)
    client.createMessage(msg.channel.id, 'The bug has been reported! <@' + msg.author.id + '>')
}, {
    description: ' ',
    fullDescription: 'Reports all teh bugs to AlekEagle!',
    usage: '<bug>',
    cooldown: 30000
});
client.registerCommand('suggestcmd', (msg) => {
    cmdsRan = ++cmdsRan
    var suggestcmd = msg.content.split(' ').splice(1).join(' ')
    client.createMessage('474203569671897104', '**__' + msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ')' + ' suggested the command: __**' + suggestcmd)
    client.createMessage(msg.channel.id, 'That has been suggested! Thank you <@' + msg.author.id + '>!')
}, {
    description: ' ',
    fullDescription: 'spoonfeed creator boi all teh ideas for commands',
    usage: '<idea>',
    cooldown: 30000
});
client.registerCommand('exec', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        var execstuff = msg.content.split(' ').splice(1).join(' ')
        client.createMessage(msg.channel.id, 'Executing please wait... <a:loading1:470030932775272469>').then((message) => {
            exec(execstuff, (err, stdout, stderr) => {
                if (err != undefined) {
                    client.editMessage(message.channel.id, message.id, 'OOF I BROKE: ```' + err + '```')
                }else {
                    if (stdout.length > 2000) {
                        client.editMessage(message.channel.id, message.id, 'Output too large, please wait while I pack the output into a file.').then(() => {
                        fs.writeFile('exec_output.txt', stdout, (err) => {
                            if (err != undefined) {
                                client.createMessage(message.channel.id, 'An error occurred while this action was being preformed error code: `' + err.code + '`')
                            }else {
                                fs.readFile('./exec_output.txt', (err, data) => {
                                    client.createMessage(message.channel.id, 'Output from exec: ', {
                                        file: data,
                                        name: 'exec_output.txt'
                                    }).then(() => {
                                        fs.unlink('./exec_output.txt')
                                    });
                                });
                            }
                        });
                    });
                    }else {
                        if (stdout === '') {
                            client.editMessage(message.channel.id, message.id, 'Done')
                        }else {
                            client.editMessage(message.channel.id, message.id, stdout)
                        }
                    }
                }
            });
        });
    }else {
        return 'You need the permission `BOT_OWNER` to use this command!';
    }
}, {
    description: ' ',
    fullDescription: 'executes shit (owner only)',
    usage: '<shit to execute>'
});
client.registerCommandAlias('ex', 'exec');
client.registerCommandAlias('execute', 'exec');
client.registerCommand('vote', () => {
    cmdsRan = ++cmdsRan
    return 'Vote for me at: https://discordbots.org/bot/416274552126177282/vote because yeet.';
}, {
    description: ' ',
    fullDescription: 'Vote for me.'
});
client.registerCommand('yeet', (msg) => {
    cmdsRan = ++cmdsRan
    return '<@' + msg.author.id + '> Thou shalt be yaught young one.'
}, {
    description: ' ',
    fullDescription: 'Yeets you'
});
client.registerCommand('dbl', (msg) => {
    cmdsRan = ++cmdsRan
    var botID = msg.content.split(' ').splice(1).join(' ').replace(/<@/ig, '').replace(/!/g, '').replace(/>/g, '');
    if (client.users.get(botID).bot === true) {
        dbl.getBot(botID).then(bot => {
            client.createMessage(msg.channel.id, {
                embed: {
                    title: bot.username + '#' + bot.discriminator,
                    description: bot.username + '#' + bot.discriminator + `${bot.certifiedBot ? ' Certified Bot' : ' Not Certified Bot'}` + '\nOwner(s): <@' + bot.owners.join('>\n    <@') + '>\nPrefix: ' + bot.prefix + '\nID: ' + bot.id,
                    url: `https://discordbots.org/bot/${botID}`,
                    image: {
                        url: `https://discordbots.org/api/widget/${botID}.png`
                    }
                }
            });
        })
        
    }else {
        client.createMessage(msg.channel.id, '**🔴 WOOP WOOP 🔴 WE GOT AN IDIOT OVER HERE TRYING TO VIEW THE BOT PAGE OF A USER!**')
    }
}, {
    description: ' ',
    fullDescription: 'gives info about other bots if they are on discordbots.org'
});
client.registerCommand('bean', (msg) => {
    cmdsRan = ++cmdsRan
    var bean = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    return 'Banned '+ msg.content.split(' ').splice(1).join(' ') + '1!!!111!1!!1!11!!!11!!'
}, {
    description: ' ',
    fullDescription: 'Totally bans a user (not clickbait)'
});
client.registerCommandAlias('bam', 'bean')
client.registerCommandAlias('blam', 'bean')
client.registerCommandAlias('ben', 'bean')
client.registerCommand('avatar', (msg) => {
    cmdsRan = ++cmdsRan
    var avatarLol = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1).join(' ')
    try{
        var type = '';
        if (client.users.get(avatarLol).avatarURL.includes('gif')) {
            type = 'gif'
        }else {type = 'png'}
        client.createMessage(msg.channel.id, {embed: {
            title: client.users.get(avatarLol).username + '#' + client.users.get(avatarLol).discriminator + '\'s avatar (click for link to avatar)',
            url: client.users.get(avatarLol).dynamicAvatarURL(type, 1024),
            image: {
                url: client.users.get(avatarLol).dynamicAvatarURL(type, 1024)
            }
        }});
    }catch (err) {
        client.createMessage(msg.channel.id, 'I can\'t seem to find a avatar for that person. Hmm')
    }
}, {
    description: ' ',
    fullDescription: 'gets a user/bot\'s avatar',
    usage: '<@mention|ID>'
});
client.registerCommand('howgay', (msg) => {
    var amountOfGay = 0
    cmdsRan = ++cmdsRan
    var howGayCommand = msg.content.split(' ').splice(1).join(' ')
    if (howGayCommand.includes('400303913456107520')) {
        amountOfGay = 150;
    }else if (howGayCommand.includes('244311039125094410')) {
        amountOfGay = 100;
    }else if (howGayCommand.includes('404148789314846721')) {
        amountOfGay = 100;
    }else if (howGayCommand.includes('454985083607056395')) {
        amountOfGay = 50;
    }else if (howGayCommand.includes('348577384678686721')) {
        amountOfGay = 0;
    }else if (howGayCommand.includes('366156674853240832')) {
        amountOfGay = 5;
    }else if (howGayCommand.includes('267494526359306241')) {
        amountOfGay = 25;
    }else if (howGayCommand.includes('69')) {
        amountOfGay = 69;
    }else {
        amountOfGay = Math.floor(Math.random() * 101);
    }
    if (amountOfGay === 0) {
        client.createMessage(msg.channel.id, howGayCommand + ' is not gay.')
    }else {
        if (amountOfGay === 69) {
            client.createMessage(msg.channel.id, howGayCommand + ' is: ' + amountOfGay + '% gay ( ͡° ͜ʖ ͡°)\n' + '🏳️‍🌈'.repeat(amountOfGay))
        }else {
            client.createMessage(msg.channel.id, howGayCommand + ' is: ' + amountOfGay + '% gay\n' + '🏳️‍🌈'.repeat(amountOfGay))
        }
    }
}, {
    description: ' ',
    fullDescription: 'shows how gay you or a friend are.',
    usage: '<literally anything>'
});
client.registerCommandAlias('howfaggot', 'howgay')
client.registerCommand('howtrap', (msg) => {
    cmdsRan = ++cmdsRan
    var howTrapCommand = msg.content.split(' ').splice(1).join(' ')
    if (howTrapCommand.includes('69')) {
        amountOfTrap = 69;
    }else {
        var amountOfTrap = Math.floor(Math.random() * 101);
    }
    if (amountOfTrap === 0) {
        client.createMessage(msg.channel.id, howTrapCommand + ' is not a trap.')
    }else {
        if (amountOfTrap === 69) {
            client.createMessage(msg.channel.id, howTrapCommand + ' is: ' + amountOfTrap + '% trap ( ͡° ͜ʖ ͡°)\n' + '⬛'.repeat(amountOfTrap))
        }else {
            client.createMessage(msg.channel.id, howTrapCommand + ' is: ' + amountOfTrap + '% trap\n' + '⬛'.repeat(amountOfTrap))
        }
    }
}, {
    description: ' ',
    fullDescription: 'howtrap.',
    usage: '<literally anything>'
});
client.registerCommand('howfurry', (msg) => {
    cmdsRan = ++cmdsRan
    var amountOfFurry = 0;
    var howFurryCommand = msg.content.split(' ').splice(1).join(' ')
    if (howFurryCommand.includes('400303913456107520')) {
        amountOfFurry = 200;
    }else if (howFurryCommand.includes('222882552472535041')) {
        amountOfFurry = 100;
    }else if (howFurryCommand.includes('158750488563679232')) {
        amountOfFurry = 100;
    }else if (howFurryCommand.includes('439373663905513473')) {
        amountOfFurry = 100;
    }else if (howFurryCommand.includes('267494526359306241')) {
        amountOfFurry = 25;
    }else if (howFurryCommand.includes('69')) {
        amountOfFurry = 69;
    }else {
        amountOfFurry = Math.floor(Math.random() * 101);
    }
    if (amountOfFurry === 0) {
        client.createMessage(msg.channel.id, howFurryCommand + ' is not a furry.')
    }else {
        if (amountOfFurry === 69) {
            client.createMessage(msg.channel.id, howFurryCommand + ' is: ' + amountOfFurry + '% furry ( ͡° ͜ʖ ͡°)\n' + ':fox:'.repeat(amountOfFurry))
        }else {
            client.createMessage(msg.channel.id, howFurryCommand + ' is: ' + amountOfFurry + '% furry\n' + ':fox:'.repeat(amountOfFurry))
        }
    }
}, {
    description: ' ',
    fullDescription: 'howfurry.',
    usage: '<literally anything>'
});
client.registerCommand('remindme', (msg) => {
    cmdsRan = ++cmdsRan
    var time = msg.content.split(' ').splice(1);
    time = parseInt(time[0]);
    var waitTimeAmount = msg.content.split(' ').splice(2);
    waitTimeAmount = waitTimeAmount[0];
    var reminder = msg.content.split(' ').splice(3).join(' ');
    if (waitTimeAmount === 's') {time = (time * 1000)}else if (waitTimeAmount === 'sec') {time = (time * 1000)}else if (waitTimeAmount === 'm') {time = (time * 1000 * 60)}else if (waitTimeAmount === 'min') {time = (time * 1000 * 60)}else if (waitTimeAmount === 'h') {time = (time * 1000 * 60 * 60)}else if (waitTimeAmount === 'hr') {time = (time * 1000 * 60 * 60)}else if (waitTimeAmount === 'd') {time = (time * 1000 * 60 * 60 * 24)}else if (waitTimeAmount === 'day') {time = (time * 1000 * 60 * 60 * 24)}else if (waitTimeAmount === 'w') {time = (time * 1000 * 60 * 60 * 24 * 7)}else if (waitTimeAmount === 'week') {time = (time * 1000 * 60 * 60 * 24 * 7)}
    client.createMessage(msg.channel.id, 'I will remind you about that in ' + (time / 1000) + ' seconds.')
    setTimeout(() => {
        client.getDMChannel(msg.author.id).then((message) => {
            client.createMessage(message.id, '<@' + msg.author.id + '> You asked me to remind you ' + time / 1000 + ' seconds ago about `' + reminder + '`')
        })
    }, time);
}, {
    description: ' ',
    fullDescription: 'Reminds you of stuff! (only supports one time unit at the moment)',
    usage: '<time in numbers> <[s|sec]|[m|min]|[h|hr]|[d|day]> <reminder thing>'
});
client.registerCommand('setprefix', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('administrator')) {
        var newPrefix = msg.content.split(' ').splice(1)
        client.registerGuildPrefix(msg.channel.guild.id, newPrefix[0])
        return 'Set prefix to: ' + newPrefix[0];
    }else {
        if (creatorID.includes(msg.author.id)) {
            var newPrefix = msg.content.split(' ').splice(1)
            client.registerGuildPrefix(msg.channel.guild.id, newPrefix[0])
            return 'Set prefix to: `' + newPrefix[0] + '`';
        }else {
            client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `ADMINISTRATOR`.')
        }
    }
}, {
    description: ' ',
    fullDescription: 'Sets the servers prefix, cannot contain spaces in the prefix',
    usage: '<PrefixWithNoSpaces>'
});
client.registerCommand('botpermcheck', (msg) => {
    cmdsRan = ++cmdsRan
    client.createMessage(msg.channel.id, `Perms I need/have:\n\`READ_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('readMessages')}\` needed to read messages to see if you used a command.\n\`SEND_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('sendMessages')}\` needed to send responses to commands.\n\`READ_MESSAGE_HISTORY: ${msg.channel.guild.members.get(client.user.id).permission.has('readMessageHistory')}\` needed for some commands that need to have arguements after the command.\n\`USE_EXTERNAL_EMOJIS: ${msg.channel.guild.members.get(client.user.id).permission.has('externalEmojis')}\` needed to use some external emojis only available in other servers.\n\`SEND_TTS_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('sendTTSMessages')}\`\n\`MANAGE_ROLES: ${msg.channel.guild.members.get(client.user.id).permission.has('manageRoles')}\`needed to give and revoke roles from users *the rest are self explanitory*\n\`KICK_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('kickMembers')}\`\n\`BAN_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('banMembers')}\`\n\`CREATE_INSTANT_INVITE: ${msg.channel.guild.members.get(client.user.id).permission.has('createInstantInvite')}\`\n\`MANAGE_NICKNAMES: ${msg.channel.guild.members.get(client.user.id).permission.has('manageNicknames')}\`\n\`CHANGE_NICKNAME: ${msg.channel.guild.members.get(client.user.id).permission.has('changeNickname')}\`\n\`MANAGE_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('manageMessages')}\`\n\`EMBED_LINKS: ${msg.channel.guild.members.get(client.user.id).permission.has('embedLinks')}\`\n\`ATTACH_FILES: ${msg.channel.guild.members.get(client.user.id).permission.has('attachFiles')}\`\n\`MENTION_EVERYONE: ${msg.channel.guild.members.get(client.user.id).permission.has('mentionEveryone')}\`\n\`ADD_REACTIONS: ${msg.channel.guild.members.get(client.user.id).permission.has('addReactions')}\`\n\`MUTE_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('voiceMuteMembers')}\`\n\`DEAFEN_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('voiceDeafenMembers')}\``)
}, {
    description: ' ',
    fullDescription: 'shows you what permissions I may need and which ones I already have'
});
//client.registerCommand('tokenchecker2000', (msg) => {
//    var token = msg.content.split(' ').splice(1).join(' ')
//    fs.writeFile('./tokenchecker2000token.txt', `${token}`)
//    exec('node tokenchecker2000.js', (err, stdout, stderr) => {
//        if (err != undefined) {
//            client.createMessage(msg.channel.id, 'Unable to connect to token checker, contact AlekEagle#6978')
//        }else {
//            setTimeout(() => {
//                fs.readFile('./output.txt', (err, data) => {
//                    var output = data.toString('utf8')
//                    client.createMessage(msg.channel.id, output)
//                });
//            }, 10000);
//        }
//    })
//        client.createMessage(msg.channel.id, eval(`const Eris = require('eris');\nconst client2 = new Eris('${token}')\nclient2.on('ready', () => {\nclient.createMessage(${msg.channel.id}, 'VALID\nusername: ' + client2.user.username + '#' + client2.user.discriminator + '\nID: ' + client2.user.id)\nclient2.disconnect()\n});\nclient2.on('error', () => {\nclient.createMessage(, 'INVALID')\n});`))
//}, {
//    description: ' ',
//    fullDescription: 'Checks bot tokens to see if they work or not!'
//});
client.on('messageReactionAdd', (msg, emoji, userID) => {
//    console.log(msg)
//    console.log(emoji)
//    console.log(userID)
    if (msg.channel.guild.members.get(userID).permission.has('manageMessages') && emoji.name === '🗑') {
    cmdsRan = ++cmdsRan
        client.deleteMessage(msg.channel.id, msg.id, 'message reaction deletion').then(() => {}, () => {
            console.error('oof')
        })
    }else if(creatorID.includes(userID) && emoji.name === '🗑') {
        client.deleteMessage(msg.channel.id, msg.id, 'message reaction deletion by owner').then(() => {}, () => {
            console.error('oof')
        })
    }
})
client.registerCommand('setname', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        client.editSelf({
            username: msg.content.split(' ').splice(1).join(' ').replace(/ /g, '_')
        })
        return 'My name is now ' + msg.content.split(' ').splice(1).join(' ').replace(/ /g, '_')
    }else {
        client.createMessage(msg.channel.id, 'You need the permission `BOT_OWNER` to use this command!')
    }
}, {
    description: ' ',
    fullDescription: 'changes my name! (bot owner only)'
});
client.registerCommand('thefudgeynugget', (msg) => {
   cmdsRan = ++cmdsRan
   client.createMessage(msg.channel.id, {
       embed: {
           title: 'TheFudgeyNugget, A YouTuber who is also a furry and is so gay I can\'t calculate how gay he is. Also this:',
           image: {
               url: 'https://cdn.discordapp.com/attachments/456451079178158081/477564900156112896/emote.png'
           }
        }
    });
}, {
    fullDescription: 'short story about TheFudgeyNugget.'
});
client.registerCommand('windows98', (msg) => {
    cmdsRan = ++cmdsRan
    var rng = Math.floor(Math.random() * 2)
    if (rng === 1) {
        console.log(rng)
        client.createMessage(msg.channel.id, 'Booting up please wait <a:loading1:470030932775272469>').then((mess) => {
            setTimeout(() => {
                client.editMessage(mess.channel.id, mess.id, 'OOF I CRASHED');
            }, 60000)
        })
    }else {
        client.createMessage(msg.channel.id, 'Booting up please wait <a:loading1:470030932775272469>')
    }
}, {
    fullDescription: 'will it boot up? try and see!'
})
client.registerCommand('e6', (msg) => {
    cmdsRan = ++cmdsRan
    var tags = msg.content.split(' ').splice(1).join('+')
    if (msg.channel.nsfw) {
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
                            title: 'e621 search results',
                            url: 'https://e621.net/post/show/' + e6searchResults[0].id.toString(),
                            image: {
                                url: e6searchResults[0].file_url.toString()
                            }
                        }
                    })
                }else {
                    msg.channel.createMessage('notfin, try usin different porn terms')
                }
            }else {
                msg.channel.createMessage('I tried talkin to e621, but they told me to fuk off')
            }
        });
    }else {
        msg.channel.createMessage('I CAN\'T SHOW THAT STUFF HERE! THERE COULD BE KIDS HERE BOI')
    }
}, {
    fullDescription: 'you can search for furry porn',
    usage: '<search terms for porn>'
});
client.registerCommand('userinfo', (msg) => {
    cmdsRan = ++cmdsRan
    var userID = '';
    try {
        userID = msg.content.split(' ').splice(1).join(' ').replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '');
    }catch (err) {
        if (err === undefined) {userID = msg.content.split(' ').spice(1).join(' ').replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '')}else {userID = msg.author.id}
        console.log(err)
    }
    var createdat = new Date(client.users.get(userID).createdAt);
    var joinedat = new Date(msg.channel.guild.members.get(userID).joinedAt);
    var type = '';
    if (client.users.get(userID).avatarURL.includes('gif')) {
        type = 'gif'
    }else {type = 'png'}
    client.createMessage(msg.channel.id, {
        content: `Info for user\nUsername: \`${client.users.get(userID).username}#${client.users.get(userID).discriminator}\`\nID: \`${client.users.get(userID).id}\`\nAre They a Bot?: \`${client.users.get(userID).bot}\`\nNickname in server (if set): \`${msg.channel.guild.members.get(userID).nickname ? msg.channel.guild.members.get(userID).nick : 'None'}\`\nCreated account at: \`${createdat}\`\nJoined At: \`${joinedat}\`\nProfile Picture:`,
        embed: {
            image: {
                url: client.users.get(userID).dynamicAvatarURL(type, 1024)
            }
        }
    });
}, {
    fullDescription: 'get user info',
    usage: '<@user|user id>'
});
client.registerCommandAlias('e621', 'e6')
client.registerCommand('r34', (msg) => {
    cmdsRan = ++cmdsRan
    var tags = msg.content.split(' ').splice(1).join('+')
    if (msg.channel.nsfw) {
        var r34search = {
            url: 'https://e621.net/index.php?page=dapi&q=index&tags=order:random+' + tags,
            headers: {
                'User-Agent': `EagleBot-Eris/${process.version}`
            }
        }
        client.sendChannelTyping(msg.channel.id)
        request(r34search, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                var r34searchResults = JSON.parse(body);
                if(typeof (r34searchResults[0]) != "undefined") {
//                    msg.channel.createMessage({
//                        embed: {
//                            title: 'rule34 search results',
//                            url: 'https://rule34.xxx/index.php?page=post&s=view&id=' + ,
//                            image: {
//                                url: r34searchResults[0].file_url.toString()
//                            }
//                        }
//                    })
                    console.log(r34searchResults)
                }else {
                    msg.channel.createMessage('notfin, try usin different porn terms')
                }
            }else {
                msg.channel.createMessage('I tried talkin to rule34, but they told me to fuk off')
            }
        })
    }else {
        msg.channel.createMessage('I CAN\'T SHOW THAT STUFF HERE! THERE COULD BE KIDS HERE BOI')
    }
client.registerCommand('help', 'Push a number to show a page', {
    description: 'this help text',
    reactionButtons:[
        {
            emoji: '1⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[0]} ${Object.values(client.commands).map(m => m.usage)[0]}\n${Object.values(client.commands).map(m => m.fullDescription)[0]}\n\n${Object.values(client.commands).map(m => m.label)[1]} ${Object.values(client.commands).map(m => m.usage)[1]}\n${Object.values(client.commands).map(m => m.fullDescription)[1]}\n\n${Object.values(client.commands).map(m => m.label)[2]} ${Object.values(client.commands).map(m => m.usage)[2]}\n${Object.values(client.commands).map(m => m.fullDescription)[2]}\n\n${Object.values(client.commands).map(m => m.label)[3]} ${Object.values(client.commands).map(m => m.usage)[3]}\n${Object.values(client.commands).map(m => m.fullDescription)[3]}\n\n${Object.values(client.commands).map(m => m.label)[4]} ${Object.values(client.commands).map(m => m.usage)[4]}\n${Object.values(client.commands).map(m => m.fullDescription)[4]}`
        },
        {
            emoji: '2⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[5]} ${Object.values(client.commands).map(m => m.usage)[5]}\n${Object.values(client.commands).map(m => m.fullDescription)[5]}\n\n${Object.values(client.commands).map(m => m.label)[6]} ${Object.values(client.commands).map(m => m.usage)[6]}\n${Object.values(client.commands).map(m => m.fullDescription)[6]}\n\n${Object.values(client.commands).map(m => m.label)[7]} ${Object.values(client.commands).map(m => m.usage)[7]}\n${Object.values(client.commands).map(m => m.fullDescription)[7]}\n\n${Object.values(client.commands).map(m => m.label)[8]} ${Object.values(client.commands).map(m => m.usage)[8]}\n${Object.values(client.commands).map(m => m.fullDescription)[8]}\n\n${Object.values(client.commands).map(m => m.label)[9]} ${Object.values(client.commands).map(m => m.usage)[9]}\n${Object.values(client.commands).map(m => m.fullDescription)[9]}`
        },
        {
            emoji: '3⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[10]} ${Object.values(client.commands).map(m => m.usage)[10]}\n${Object.values(client.commands).map(m => m.fullDescription)[10]}\n\n${Object.values(client.commands).map(m => m.label)[11]} ${Object.values(client.commands).map(m => m.usage)[11]}\n${Object.values(client.commands).map(m => m.fullDescription)[11]}\n\n${Object.values(client.commands).map(m => m.label)[12]} ${Object.values(client.commands).map(m => m.usage)[12]}\n${Object.values(client.commands).map(m => m.fullDescription)[12]}\n\n${Object.values(client.commands).map(m => m.label)[13]} ${Object.values(client.commands).map(m => m.usage)[13]}\n${Object.values(client.commands).map(m => m.fullDescription)[13]}\n\n${Object.values(client.commands).map(m => m.label)[14]} ${Object.values(client.commands).map(m => m.usage)[14]}\n${Object.values(client.commands).map(m => m.fullDescription)[14]}`
        },
        {
            emoji: '4⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[15]} ${Object.values(client.commands).map(m => m.usage)[15]}\n${Object.values(client.commands).map(m => m.fullDescription)[15]}\n\n${Object.values(client.commands).map(m => m.label)[16]} ${Object.values(client.commands).map(m => m.usage)[16]}\n${Object.values(client.commands).map(m => m.fullDescription)[16]}\n\n${Object.values(client.commands).map(m => m.label)[17]} ${Object.values(client.commands).map(m => m.usage)[17]}\n${Object.values(client.commands).map(m => m.fullDescription)[17]}\n\n${Object.values(client.commands).map(m => m.label)[18]} ${Object.values(client.commands).map(m => m.usage)[18]}\n${Object.values(client.commands).map(m => m.fullDescription)[18]}\n\n${Object.values(client.commands).map(m => m.label)[19]} ${Object.values(client.commands).map(m => m.usage)[19]}\n${Object.values(client.commands).map(m => m.fullDescription)[19]}`
        },
        {
            emoji: '5⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[20]} ${Object.values(client.commands).map(m => m.usage)[20]}\n${Object.values(client.commands).map(m => m.fullDescription)[20]}\n\n${Object.values(client.commands).map(m => m.label)[21]} ${Object.values(client.commands).map(m => m.usage)[21]}\n${Object.values(client.commands).map(m => m.fullDescription)[21]}\n\n${Object.values(client.commands).map(m => m.label)[22]} ${Object.values(client.commands).map(m => m.usage)[22]}\n${Object.values(client.commands).map(m => m.fullDescription)[22]}\n\n${Object.values(client.commands).map(m => m.label)[23]} ${Object.values(client.commands).map(m => m.usage)[23]}\n${Object.values(client.commands).map(m => m.fullDescription)[23]}\n\n${Object.values(client.commands).map(m => m.label)[24]} ${Object.values(client.commands).map(m => m.usage)[24]}\n${Object.values(client.commands).map(m => m.fullDescription)[24]}`
        },
        {
            emoji: '6⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[25]} ${Object.values(client.commands).map(m => m.usage)[25]}\n${Object.values(client.commands).map(m => m.fullDescription)[25]}\n\n${Object.values(client.commands).map(m => m.label)[26]} ${Object.values(client.commands).map(m => m.usage)[26]}\n${Object.values(client.commands).map(m => m.fullDescription)[26]}\n\n${Object.values(client.commands).map(m => m.label)[27]} ${Object.values(client.commands).map(m => m.usage)[27]}\n${Object.values(client.commands).map(m => m.fullDescription)[27]}\n\n${Object.values(client.commands).map(m => m.label)[28]} ${Object.values(client.commands).map(m => m.usage)[28]}\n${Object.values(client.commands).map(m => m.fullDescription)[28]}\n\n${Object.values(client.commands).map(m => m.label)[29]} ${Object.values(client.commands).map(m => m.usage)[29]}\n${Object.values(client.commands).map(m => m.fullDescription)[29]}`
        },
        {
            emoji: '7⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[30]} ${Object.values(client.commands).map(m => m.usage)[30]}\n${Object.values(client.commands).map(m => m.fullDescription)[30]}\n\n${Object.values(client.commands).map(m => m.label)[31]} ${Object.values(client.commands).map(m => m.usage)[31]}\n${Object.values(client.commands).map(m => m.fullDescription)[31]}\n\n${Object.values(client.commands).map(m => m.label)[32]} ${Object.values(client.commands).map(m => m.usage)[32]}\n${Object.values(client.commands).map(m => m.fullDescription)[32]}\n\n${Object.values(client.commands).map(m => m.label)[33]} ${Object.values(client.commands).map(m => m.usage)[33]}\n${Object.values(client.commands).map(m => m.fullDescription)[33]}\n\n${Object.values(client.commands).map(m => m.label)[34]} ${Object.values(client.commands).map(m => m.usage)[34]}\n${Object.values(client.commands).map(m => m.fullDescription)[34]}`
        },
        {
            emoji: '8⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[35]} ${Object.values(client.commands).map(m => m.usage)[35]}\n${Object.values(client.commands).map(m => m.fullDescription)[35]}\n\n${Object.values(client.commands).map(m => m.label)[36]} ${Object.values(client.commands).map(m => m.usage)[36]}\n${Object.values(client.commands).map(m => m.fullDescription)[36]}\n\n${Object.values(client.commands).map(m => m.label)[37]} ${Object.values(client.commands).map(m => m.usage)[37]}\n${Object.values(client.commands).map(m => m.fullDescription)[37]}\n\n${Object.values(client.commands).map(m => m.label)[38]} ${Object.values(client.commands).map(m => m.usage)[38]}\n${Object.values(client.commands).map(m => m.fullDescription)[38]}\n\n${Object.values(client.commands).map(m => m.label)[39]} ${Object.values(client.commands).map(m => m.usage)[39]}\n${Object.values(client.commands).map(m => m.fullDescription)[39]}`
        },
        {
            emoji: '9⃣',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[40]} ${Object.values(client.commands).map(m => m.usage)[40]}\n${Object.values(client.commands).map(m => m.fullDescription)[40]}\n\n${Object.values(client.commands).map(m => m.label)[41]} ${Object.values(client.commands).map(m => m.usage)[41]}\n${Object.values(client.commands).map(m => m.fullDescription)[41]}\n\n${Object.values(client.commands).map(m => m.label)[42]} ${Object.values(client.commands).map(m => m.usage)[42]}\n${Object.values(client.commands).map(m => m.fullDescription)[42]}\n\n${Object.values(client.commands).map(m => m.label)[43]} ${Object.values(client.commands).map(m => m.usage)[43]}\n${Object.values(client.commands).map(m => m.fullDescription)[43]}\n\n${Object.values(client.commands).map(m => m.label)[44]} ${Object.values(client.commands).map(m => m.usage)[44]}\n${Object.values(client.commands).map(m => m.fullDescription)[44]}`
        },
        {
            emoji: '🔟',
            type: 'edit',
            response: `${Object.values(client.commands).map(m => m.label)[45]} ${Object.values(client.commands).map(m => m.usage)[45]}\n${Object.values(client.commands).map(m => m.fullDescription)[45]}`
        },
    ],
    reactionButtonTimeout: 60000
})
client.registerCommandAlias('hlep', 'help')
client.registerCommandAlias('halp', 'help')
client.connect();
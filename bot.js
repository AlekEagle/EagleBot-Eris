const Eris = require('eris');
const u_wut_m8 = require('./.auth.json');
const DBL = require('dblapi.js');
const creatorID = '222882552472535041,361773766256361472';
const client = new Eris.CommandClient(u_wut_m8.token, {}, {
    defaultHelpCommand: false,
    description: 'EagleBot in Eris Form',
    owner: 'AlekEagle#6978',
    prefix: 'beta}'
});
const HOST = '192.168.0.41';
const PORT = 13332;
const net = require('net');
const death = 'idk, but i know its something important';
const dbl = new DBL(u_wut_m8.dblToken, {}, client);
const fs = require('fs');
const sys = require('sys');
const exec = require('child_process').exec;
const request = require('request');
const parser = require('xml2json-light');
const util = require('util');
const os = require('os');
const { PlayerManager } = require('eris-lavalink');
const http = require('http');
const musicUtils = require('./musicUtils');
const IFTTTResponseBot = {
  url: 'https://maker.ifttt.com/trigger/bot_restarted/with/key/bHwWykSwBAGNLWrbUbbObu',
  headers: {
    'User-Agent': 'EagleNugget restart bot service'
  }
}
let nodes = [
	{ host: 'localhost', port: 2333, region: 'us', password: 'youshallnotpass' }
];

let regions = {
	eu: ['eu', 'amsterdam', 'frankfurt', 'russia', 'hongkong', 'singapore', 'sydney'],
	us: ['us', 'brazil'],
};
var tcpClient = new net.Socket();
var tcpOwner = '';
var tcpOwnerID = '';
var timesCancerHasBeenCured = '0';
function puts(error, stdout, stderr) { sys.puts(stdout) }
var cmdsRan = 0;
var messagesRead = 0;
var server = net.createServer(onClientConnected);  
var verified = false
server.listen(PORT, HOST, function() {  
  console.log('server listening on %j', server.address());
});
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
function onDBLVote(data) {
    client.getDMChannel(data.user).then(msg => {
        client.createMessage(msg.id, "Thank you so much for voting for me!")
    }, () => {
        console.error('Unable to DM user')
    });
}
http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`)
    if (req.method === 'POST') {
        let body = '';
        if (req.headers.authorization === 'Ummkthx') {
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                onDBLVote(JSON.parse(body))
                if (JSON.parse(body).type === 'test') {
                    console.log(JSON.parse(body))
                }
                res.end('{"success":"true"}')
            });
        }else {
            res.statusCode = 403;
            res.end('{"error":"403 UNAUTHORIZED"}')
        }
    }
}).listen(19132);
function onClientConnected(sock) {  
    var remoteAddress = sock.remoteAddress + ':' + sock.remotePort;
    console.log('new client connected: %s', remoteAddress);
    sock.write('Please login.')
    sock.on('data', function(data) {
      try {
      if (verified === false) {
        if (data.toString().split(' ')[0] === u_wut_m8.username && data.toString().split(' ')[1] === u_wut_m8.password) {
          sock.write('Verified, you can now execute code.')
          verified = true
        }else {
          sock.write('Verification incorrect. please try again.')
        }
      }else {
        sock.write(util.inspect(eval(data.toString())))
      }
      }catch (err) {
          sock.write('err occurred oof' + err)
      }
    });
    sock.on('close',  function () {
      console.log('connection from %s closed', remoteAddress);
      verified = false
    });
    sock.on('error', function (err) {
      console.log('Connection %s error: %s', remoteAddress, err.message);
    });
  };
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
client.on('error', (err) => {
    if (typeof evaluation !== "string") {
        err = util.inspect(err)
    }
    console.error(`oh shit I don't feel so good\n${err}`)
})
function clickbait(path, data) {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.error(err);
        }
    });
}
function updateWal(id, money, spinner) {
    clickbait(`./economy/${id}.eco`, `money:${money}\nspinner:${spinner}`)
}
function readWal(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(`./economy/${id}.eco`, (err, data) => {
            if (err) {
                reject(err);
            }else {
                data = data.toString().split('\n')
                let dataJSON = {
                    'money': `${data[0].split(':')[1]}`,
                    'spinner': `${data[1].split(':')[1]}`
                }
                resolve(dataJSON);
            }
        });
    });
}
client.on('ready', () => {
    console.log('THIS BOT IS READY BOIIIIII');
    clickbait('../node server/info/theinfostuff/guilds.txt', client.guilds.size)
    request(IFTTTResponseBot, () => {
        console.log('Told IFTTT that I restarted');
    });
<<<<<<< HEAD
    if (!(client.voiceConnections instanceof PlayerManager)) {
        client.voiceConnections = new PlayerManager(client, nodes, {
            numShards: 1, // number of shards
            userId: '416274552126177282', // the user id of the bot
            regions: regions,
            defaultRegion: 'us',
        });
    }
=======
//    if (!(client.voiceConnections instanceof PlayerManager)) {
//        client.voiceConnections = new PlayerManager(client, nodes, {
//            numShards: 1, // number of shards
//            userId: '416274552126177282', // the user id of the bot
//            regions: regions,
//            defaultRegion: 'us',
//        });
//    }
>>>>>>> a18fe0a5e71252fc220898c71724d27cc37db5f4
});
dbl.on('posted', () => {
    console.log('yeet!!!! Server count posted')
});
client.on('guildMemberAdd', (g, m) => {
    fs.readFile(`./join_warns/${g.id}.txt`, (err, data) => {
        if (!err && data) {
            data = data.toString()
            if (data.includes(m.id)) {
                var mods = g.members.filter(mem => mem.permission.has('kickMembers') !== false)
                fs.writeFile(`./join_warns/${g.id}.txt`, data.replace(`,${m.id}`, ''), (err) => {
                    if (err) {
                        console.error('error at guildMemberAdd')
                    }
                });
                mods.forEach(mod => {
                    client.getDMChannel(mod.id).then((dm) => {
                        joinDate = new Date(m.joinedAt);
                        dm.createMessage(`**__THIS IS AN ALERT FROM THE AUTOMATED SDW (SERVER DANGER WARNING) ALERTING YOU THAT AT \`${joinDate}\` THE USER \`${m.username}#${m.discriminator}\` JOINED THE SERVER: \`${g.name}\`. THE REASON YOU RECIEVED THIS MESSAGE IS BECAUSE YOU ARE A USER WITH THE PERMISSION \`KICK_MEMBERS\` AND A PERSON WITH \`KICK_MEMBERS\` CREATED THIS WARNING. END OF MESSAGE.__**`);
                    });
                });
            }
        }
    });
});
client.on('messageCreate', (message) => {
    ++messagesRead
    if (message.content.includes('<@') && message.content.includes(client.user.id) && message.content.includes('>') && message.author.bot !== true) {
        let prefixes = client.guildPrefixes;
        if (prefixes[message.channel.guild.id] === undefined) {
            message.channel.createMessage('My prefix for this server is `a}`!')
        }else {
            message.channel.createMessage(`My prefix for this server is \`${prefixes[message.channel.guild.id]}\`!`)
        }
    }
    if (message.content.substring(0, 2) === 'a}' && message.content.split('').splice(2).join('').split(' ')[0] === 'rape' && message.author.bot === false) {
        client.deleteMessage(message.channel.id, message.id)
        client.createMessage(message.channel.id, message.content.split(' ').splice(1).join(' ') + ' has been raped!!!!!!')
    }
    clickbait('../node server/info/theinfostuff/cmdsran.txt', cmdsRan.toString())
    clickbait('../node server/info/theinfostuff/msgs.txt', messagesRead.toString())
    clickbait('../node server/info/theinfostuff/uptime.txt', `${process.uptime().toString().toHHMMSS()} and ${os.uptime().toString().toHHMMSS()}`)
    clickbait('../node server/info/theinfostuff/memuse.txt', `${Math.floor(process.memoryUsage().rss / 1024 / 1024)} MBs (${Math.floor(os.freemem() / 1024 / 1024)} MBs | ${Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024)} MBs | ${Math.floor(os.totalmem() / 1024 / 1024)} MBs)`)
});
client.on('guildCreate', guild => {
    clickbait('../node server/info/theinfostuff/guilds.txt', client.guilds.size)
    var joinChannel = guild.channels.map(c => c.name).indexOf('general')
    var bots = guild.members.filter(m => m.bot).length;
    var notBots = guild.memberCount-bots;
    var percent = Math.floor((bots / guild.memberCount) * 100);
    if (joinChannel === -1) {
        var y = 0;
        loop = true;
        do {
            if (guild.channels.map(c => c.type)[y] === 0) {
                loop = false;
            }else if (guild.channels.map(c => c.type)[y] === 2) {
                y = ++y;
            }else if (guild.channels.map(c => c.type)[y] === 4) {
                y = ++y;
            }
        }while (loop)
        client.createMessage(guild.channels.map(c => c.id)[y], `Hi! I'm ${client.user.username}! I am a Discord bot made by a 13 year old!`)
        client.createChannelInvite(guild.channels.map(c => c.id)[y], {
            maxAge: 0
        }).then((invite) => {
            client.createMessage('479721048296783883', `Invite to the guild ${guild.name} with the ID ${guild.id} https://discord.gg/${invite.code} user to bot ratio: ${notBots}:${bots}, percent of bots is ${percent}%.`)
        }, () => {
            client.createMessage('479721048296783883', `Cannot create an invite to the guild ${guild.name} with the ID ${guild.id} user to bot ratio: ${notBots}:${bots}, percent of bots is ${percent}%.`)
        })
    }else {
        client.createMessage(guild.channels.map(c => c.id)[joinChannel], `Hi! I'm ${client.user.username}! I am a Discord bot made by a 13 year old!`)
        client.createChannelInvite(guild.channels.map(c => c.id)[joinChannel], {
            maxAge: 0
        }).then((invite) => {
            client.createMessage('479721048296783883', `Invite to the guild ${guild.name} with the ID ${guild.id} https://discord.gg/${invite.code} user to bot ratio: ${notBots}:${bots}, percent of bots is ${percent}%.`)
        }, () => {
            client.createMessage('479721048296783883', `Cannot create an invite to the guild ${guild.name} with the ID ${guild.id}.  user to bot ratio: ${notBots}:${bots}, percent of bots is ${percent}%.`)
        })
    }
});
client.on('guildDelete', guild => {
    clickbait('../node server/info/theinfostuff/guilds.txt', client.guilds.size);
    var bots = guild.members.filter(m => m.bot).length;
    var notBots = guild.memberCount-bots;
    var percent = Math.floor((bots / guild.memberCount) * 100);
    client.createMessage('479721048296783883', `left guild ${guild.name} with the ID ${guild.id} user to bot ratio: ${notBots}:${bots}, percent of bots is ${percent}%.`);
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
        
    }, {
    description: ' ',
    fullDescription: 'it will pong when you say a}ping'
});
client.registerCommand('curecancer', (msg) => {
    cmdsRan = ++cmdsRan
    readWal(msg.author.id).then((wal) => {
        if (parseInt(wal.money) < 100) {msg.channel.createMessage(`You do not have enough e-bucks for research! you need at least ${100 - parseInt(wal.money)} more e-bucks!`)}else {
            updateWal(msg.author.id, parseInt(wal.money) - 100, wal.spinner)
            var rNG  = Math.floor(Math.random() * 100);
//                var rNG = 100;
            if (rNG < 99) {
                client.createMessage(msg.channel.id, ':skull: You spend 100 e-bucks on research. But, you still died. The ironic part is you died from cancer. I\'m not sure you\'re able to cure cancer, but keep on trying!')
                console.log(rNG);
            }else {
                client.createMessage(msg.channel.id, 'You spent 100 e-bucks on research and somehow cured all types of cancer! <@' + msg.author.id + '> actually did it! *We all thought you were crazy*')
                console.log(rNG);
                fs.readFile('cancercured.txt', function(err, data) {
                    var string = data.toString('utf8')
                    var numForCancer = parseInt(string)
                    fs.writeFile('cancercured.txt', ++numForCancer)
                });
            }
        }
    }, () => {
        updateWal(msg.author.id, 0, 0)
        msg.channel.createMessage('You do not have enough e-bucks for research! you need at least 100 more e-bucks!')
    });
}, {
    description: ' ',
    fullDescription: 'This will cure cancer (not really), you have a 1 in 100 chance of it actually happening.'
});
client.registerCommand('setnick', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageNicknames') || creatorID.includes(msg.author.id)) {
        var userID = msg.content.split(' ').splice(1)[0].replace(/<@/g, '').replace(/>/g, '').replace(/!/g, '')
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
}, {
    description: ' ',
    fullDescription: 'Changes nickname of a user. (requires permission `MANAGE_NICKNAMES`)',
    usage: '(user mention) (nickname|blank to reset)'
    
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
    usage: '(your message)'
});
client.registerCommand('del', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageMessages') || creatorID.includes(msg.author.id)) {
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
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
    }
}, {
    description: ' ',
    fullDescription: 'Deletes a certian amount of messages. (requires permission `MANAGE_MESSAGES`)',
    usage: '(number of messages to delete|leave blank for 50)'
});
client.registerCommand('revivechat', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('mentionEveryone') === true && msg.content.split(' ').splice(1).toString() === 'yes') {
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
    if (msg.member.permission.has('manageRoles') || creatorID.includes(msg.author.id)) {
        msg.channel.guild.members.get(msg.mentions[0].id).addRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' granted role').then(() => {
            client.createMessage(msg.channel.id, 'Gave role!')
        }, () => {
            client.createMessage(msg.channel.id, 'Failed, do I have permissions?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_ROLES`.')
    }
}, {
    description: ' ',
    fullDescription: 'gives role to user (Must be able to mention/ping role! needs permission `MANAGE_ROLES`)',
    usage: '(Mention user) (Mention role)'
});
client.registerCommand('revokerole', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageRoles') || creatorID.includes(msg.author.id)) {
        msg.channel.guild.members.get(msg.mentions[0].id).removeRole(msg.content.split(' ').splice(2).toString().replace(/<@&/g, '').replace(/>/g, ''), msg.author.username + '#' + msg.author.discriminator + ' revoked role').then(() => {
            client.createMessage(msg.channel.id, 'Took role!')
        }, () => {
            client.createMessage(msg.channel.id, 'Failed, do I have permissions?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_ROLES`.')
    }
}, {
    description: ' ',
    fullDescription: 'Removes the role from the user (Must be able to mention/ping role! needs permission `MANAGE_ROLES`)',
    usage: '(Mention user) (Mention role)'
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
    usage: '(status) (type) (game name)'
});
client.registerCommand('touch', (msg) => {
    cmdsRan = ++cmdsRan
    var touch = msg.content.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
    return '*Touched ' + touch + '*'
}, {
    description: ' ',
    fullDescription: 'Kinda kinky',
    usage: '(thing to touch)'
});
client.registerCommand('ban', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('banMembers') || creatorID.includes(msg.author.id)) {
        var ban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.banGuildMember(msg.channel.guild.id, ban[0], parseInt(ban[1]), msg.content.split(' ').splice(3).join(' ')).then(() => {
            client.createMessage(msg.channel.id, 'Banned '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`)
        }, () => {
            client.createMessage(msg.channel.id, 'Failed, Do I have permissions?')
        })
        
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
    }
}, {
    description: ' ',
    fullDescription: 'Bans users. (requires permission `BAN_MEMBERS`)',
    usage: '<@user> <days of messages to delete 0-7> <reason>'
});
client.registerCommand('unban', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('banMembers') || creatorID.includes(msg.author.id)) {
        var unban = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.unbanGuildMember(msg.channel.guild.id, unban[0], msg.content.split(' ').splice(2).join(' '))
        return 'Unanned '+ msg.content.split(' ').splice(1).join(' ')
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `BAN_MEMBERS`.')
    }
}, {
    description: ' ',
    fullDescription: 'Unbans users. (requires permission `BAN_MEMBERS`)',
    usage: '(ID) (reason)'
});
client.registerCommand('kick', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('kickMembers') || creatorID.includes(msg.author.id)) {
        var kick = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
        client.kickGuildMember(msg.channel.guild.id, kick[0], msg.content.split(' ').splice(2).join(' ')).then(() => {
            client.createMessage(msg.channel.id, 'Kicked '+ msg.content.split(' ').splice(1)[0] + ' for: ' + `${msg.content.split(' ').splice(2).join(' ') ? msg.content.split(' ').splice(2).join(' ') : 'reason'}`)
        }, () => {
            client.createMessage(msg.channel.id, 'Failed,  do I have permissions?')
        })
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `KICK_MEMBERS`.')
    }
}, {
    description: ' ',
    fullDescription: 'Kicks members. (requires permission `KICK_MEMBERS`)',
    usage: '(@user) (reason)'
});
client.registerCommand('succ', (msg) => {
    cmdsRan = ++cmdsRan
    var succ = msg.content.split(' ').splice(1).join(' ').replace(/my/g, 'your').replace(/im/g, 'you\'re').replace(/i'm/g, 'you\'re').replace(/Im/g, 'you\'re').replace(/I'm/g, 'you\'re')
    return '*Succed ' + succ + '*'
}, {
    description: ' ',
    fullDescription: 'really gay uwu.',
    usage: '(thing to succ)'
});
client.registerCommand('meme', (msg) => {
    cmdsRan = ++cmdsRan
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
                                clickbait('../node\ server/info/theinfostuff/memes.txt', files.join(', ').replace(/.meme/g, ''))
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
            return 'goto http://plsdab.asuscomm.com/info/memes for all of the memes.';
        break;
        case 'delmeme':
            if (creatorID.includes(msg.author.id)) {
                var delMemeCommand = msg.content.split(' ').splice(2)
                fs.unlink('./good_memes_probably/' + delMemeCommand[0] + '.meme', function(err) {
                    client.createMessage(msg.channel.id, `${err ? 'OOF error whoops! ' + err.code : 'It\'s most likely gone, yeah I\'m pretty sure it\'s gone'}`).then(() => {
                        if (err !== undefined) {
                            fs.readdir('./good_memes_probably/', (err, files) => {
                                clickbait('../node\ server/info/theinfostuff/memes.txt', files.join(', ').replace(/.meme/g, ''))
                            });
                        }
                    });
                });
            }else {
                client.createMessage(msg.channel.id, 'You currently do not have the permission to use this! However, the owner of the bot is plotting a way to have the creator of the meme be albe to delete their own meme.')
                console.log(msg.author.username + '#' + msg.author.discriminator + ' (' + msg.author.id + ') Tried to use delmeme!');
            }
    }
}, {
    description: ' ',
    fullDescription: 'MEME STORAGE CENTER!',
    usage: '`((savememe (name_of_meme) (contents of meme|link to picture for pictures))|(showmeme (name_of_meme))|(listmeme)|(owner only currently)(delmeme (name_of_meme))`'
});
client.registerCommandAlias('maymay', 'meme');
client.registerCommand('mute', (msg) => {
    cmdsRan = ++cmdsRan
    var mute = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceMuteMembers') || creatorID.includes(msg.author.id)) {
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
}, {
    description: ' ',
    fullDescription: 'Server mutes user (requires permission `MUTE_MEMBERS`)',
    usage: '(@user)'
})
client.registerCommand('unmute', (msg) => {
    cmdsRan = ++cmdsRan
    var unmute = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceMuteMembers') || creatorID.includes(msg.author.id)) {
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
}, {
    description: ' ',
    fullDescription: 'Server unmutes user (if previously muted) (requires permission `MUTE_MEMBERS`)',
    usage: '(@user)'
})
client.registerCommand('deafen', (msg) => {
    cmdsRan = ++cmdsRan
    var deafen = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceDeafenMembers') || creatorID.includes(msg.author.id)) {
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
}, {
    description: ' ',
    fullDescription: 'Server deafens user (requires permission `DEAFEN_MEMBERS`)',
    usage: '(@user)'
})
client.registerCommand('undeafen', (msg) => {
    cmdsRan = ++cmdsRan
    var undeafen = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1)
    if (msg.member.permission.has('voiceDeafenMembers') || creatorID.includes(msg.author.id)) {
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
}, {
    description: ' ',
    fullDescription: 'Server undeafens user (if previously deafened)',
    usage: '(@user)'
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
    return 'here you go: http://plsdab.asuscomm.com/invite';
}, {
    description: ' ',
    fullDescription: 'Invite me!'
});
client.registerCommand('emojify', (msg) => {
    cmdsRan = ++cmdsRan
    var emojify = msg.content.split(' ').splice(1).join(' ').replace(/ /g, '    ').replace(/ab/ig, '🆎 ').replace(/a/ig, '🅰︄ ').replace(/b/ig, '🅱︄ ').replace(/c/ig, '🇨 ').replace(/d/ig, '🇩 ').replace(/e/ig, '🇪 ').replace(/f/ig, '🇫 ').replace(/g/ig, '🇬 ').replace(/h/ig, '🇭 ').replace(/i/ig, '🇮 ').replace(/j/ig, '🇯 ').replace(/k/ig, '🇰 ').replace(/l/ig, '🇱 ').replace(/m/ig, '🇲 ').replace(/n/ig, '🇳 ').replace(/p/ig, '🇵 ').replace(/q/ig, '🇶 ').replace(/s/ig, '🇸 ').replace(/t/ig, '🇹 ').replace(/u/ig, '🇺 ').replace(/v/ig, '🇻 ').replace(/w/ig, '🇼 ').replace(/x/ig, '🇽 ').replace(/y/ig, '🇾 ').replace(/z/ig, '🇿 ').replace(/r/ig, '🇷 ').replace(/o/ig, '🅾︄ ').replace(/0/ig, ':zero: ').replace(/1/ig, ':one: ').replace(/2/ig, ':two: ').replace(/3/ig, ':three: ').replace(/4/ig, ':four: ').replace(/5/ig, ':five: ').replace(/6/ig, ':six: ').replace(/7/ig, ':seven: ').replace(/8/ig, ':eight: ').replace(/9/ig, ':nine: ').replace(/!/ig, '❕ ').replace(/\?/ig, '❔ ');
    return emojify;
}, {
    description: ' ',
    fullDescription: 'Turns normal letters into emojis!',
    usage: '(thing to turn into emojis)'
});
client.registerCommand('info', (msg) => {
    cmdsRan = ++cmdsRan
    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();
    var osTime = os.uptime();
    var osUptime = (osTime + "").toHHMMSS();
    client.createMessage(msg.channel.id, {
        embed: {
            title: 'Basic Info',
            description: 'Ummm... I\'m a Discord Bot.\n\n I was made by **__AlekEagle#6978__**\n\n*What else is there about me?* I use the Eris library\n\nThis right there ==> **__' + uptime + '__** is how long I\'ve been running.\n\nThe computer running me has been on for this ==> **__' + osUptime + '__**\n\nI\'m ran on a Raspberry Pi 3 B\n\nI\'m on DBL, here is the link: https://discordbots.org/bot/416274552126177282 \n\nI\'m in... uhh... let me check. Ok here it is: **__' + client.guilds.size + '__** servers.\n\nThe support server is https://discord.gg/72Px4Ag in the category "bot related stuff"\n\nUse `a}invite` to take a clone of me with you to your server\n\nI\'m using: **__' + Math.floor(process.memoryUsage().rss / 1024 / 1024) + 'MB__** of RAM\n\n**__' + cmdsRan + '__** commands have been run since the last time I\'ve been rebooted.\n\n**__' + messagesRead + '__** messages have been read since the last time I\'ve been rebooted.\n\nThat\'s all I know about myself.\n\nIf you want to see it be more organized on a website goto http://plsdab.asuscomm.com/info for that.'
        }
    });
}, {
    description: ' ',
    fullDescription: 'shows basic info about me.'
});
client.registerCommandAlias('information', 'info')
client.registerCommand('reboot', (msg) => {
    if (creatorID.includes(msg.author.id)) {
        client.createMessage(msg.channel.id, `Alright ${msg.author.username}! Imma go take a nap!`)
        setTimeout(() => {
            process.exit(0);
        }, 100)
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
                evaluation = util.inspect(evaluation).replace(client.token, '(insert token here)')
            }else {
                evaluation = evaluation.replace(client.token, '(insert token here)')
            }
            if (evaluation.length > 2000) {
                client.createMessage(msg.channel.id, 'Output too large, it should be on your website at http://plsdab.asuscomm.com/eval_out').then(() => {
                    fs.writeFile('../node server/eval_out/eval_output.txt', evaluation, (err) => {
                        if (err != undefined) {
                            client.createMessage(msg.channel.id, 'An error occurred while this action was being preformed error code: `' + err.code + '`')
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
    usage: '(bug)',
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
    usage: '(idea)',
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
                        client.editMessage(message.channel.id, message.id, 'Output too large, goto http://plsdab.asuscomm.com/exec_out.').then(() => {
                        fs.writeFile('../node server/exec_out/exec_output.txt', stdout.replace(client.token, "(insert token here)"), (err) => {
                            if (err != undefined) {
                                client.createMessage(message.channel.id, 'An error occurred while this action was being preformed error code: `' + err.code + '`')
                            }
                        });
                    });
                    }else {
                        if (stdout === '') {
                            client.editMessage(message.channel.id, message.id, 'Done')
                        }else {
                            client.editMessage(message.channel.id, message.id, stdout.replace(client.token, "(insert token here)"))
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
    usage: '(shit to execute)'
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
        }, () => {
            client.createMessage(msg.channel.id, 'I don\'t think I see them on there, hmm.')
        })
        
    }else {
        client.createMessage(msg.channel.id, '**🔴 WOOP WOOP 🔴 WE GOT AN IDIOT OVER HERE TRYING TO VIEW THE BOT PAGE OF A USER!**')
    }
}, {
    description: ' ',
    fullDescription: 'gives info about other bots if they are on discordbots.org',
    usage: '(bot Mention)'
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
    usage: '(@mention|ID)'
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
    usage: '(literally anything)'
});
client.registerCommandAlias('howfaggot', 'howgay')
client.registerCommand('howtrap', (msg) => {
    cmdsRan = ++cmdsRan
    var howTrapCommand = msg.content.split(' ').splice(1).join(' ')
    if (howTrapCommand.includes('69')) {
        amountOfTrap = 69;
    }else if (howTrapCommand.includes('348577384678686721')) {
        amountOfTrap = 100;
    }else {
        amountOfTrap = Math.floor(Math.random() * 101);
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
    usage: '(literally anything)'
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
    }else if (howFurryCommand.includes('416274552126177282')) {
        amountOfFurry = 100;
    }else if (howFurryCommand.includes('225405394644631552')) {
        amountOfFurry = 100;
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
    usage: '(literally anything)'
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
    usage: '(time in numbers) ([s|sec]|[m|min]|[h|hr]|[d|day]) (reminder thing)'
});
client.registerCommand('setprefix', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('administrator') || creatorID.includes(msg.author.id)) {
        var newPrefix = msg.content.split(' ').splice(1)
        client.registerGuildPrefix(msg.channel.guild.id, newPrefix[0])
        return 'Set prefix to: ' + newPrefix[0];
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `ADMINISTRATOR`.')
    }
}, {
    description: ' ',
    fullDescription: 'Sets the servers prefix, cannot contain spaces in the prefix',
    usage: '(PrefixWithNoSpaces)'
});
client.registerCommand('botpermcheck', (msg) => {
    cmdsRan = ++cmdsRan
    client.createMessage(msg.channel.id, `Perms I need/have:\n\`READ_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('readMessages')}\` needed to read messages to see if you used a command.\n\`SEND_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('sendMessages')}\` needed to send responses to commands.\n\`READ_MESSAGE_HISTORY: ${msg.channel.guild.members.get(client.user.id).permission.has('readMessageHistory')}\` needed for some commands that need to have arguements after the command.\n\`USE_EXTERNAL_EMOJIS: ${msg.channel.guild.members.get(client.user.id).permission.has('externalEmojis')}\` needed to use some external emojis only available in other servers.\n\`SEND_TTS_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('sendTTSMessages')}\`\n\`MANAGE_ROLES: ${msg.channel.guild.members.get(client.user.id).permission.has('manageRoles')}\`needed to give and revoke roles from users *the rest are self explanitory*\n\`KICK_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('kickMembers')}\`\n\`BAN_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('banMembers')}\`\n\`CREATE_INSTANT_INVITE: ${msg.channel.guild.members.get(client.user.id).permission.has('createInstantInvite')}\`\n\`MANAGE_NICKNAMES: ${msg.channel.guild.members.get(client.user.id).permission.has('manageNicknames')}\`\n\`CHANGE_NICKNAME: ${msg.channel.guild.members.get(client.user.id).permission.has('changeNickname')}\`\n\`MANAGE_MESSAGES: ${msg.channel.guild.members.get(client.user.id).permission.has('manageMessages')}\`\n\`EMBED_LINKS: ${msg.channel.guild.members.get(client.user.id).permission.has('embedLinks')}\`\n\`ATTACH_FILES: ${msg.channel.guild.members.get(client.user.id).permission.has('attachFiles')}\`\n\`MENTION_EVERYONE: ${msg.channel.guild.members.get(client.user.id).permission.has('mentionEveryone')}\`\n\`ADD_REACTIONS: ${msg.channel.guild.members.get(client.user.id).permission.has('addReactions')}\`\n\`MUTE_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('voiceMuteMembers')}\`\n\`DEAFEN_MEMBERS: ${msg.channel.guild.members.get(client.user.id).permission.has('voiceDeafenMembers')}\``)
}, {
    description: ' ',
    fullDescription: 'shows you what permissions I may need and which ones I already have'
});
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
}, {
    fullDescription: 'you can search for furry porn',
    usage: '(search terms for porn)'
});
client.registerCommand('userinfo', (msg) => {
    cmdsRan = ++cmdsRan
    try {
        var userID = '';
        if (msg.content.split(' ')[1] === undefined) {userID = msg.author.id}else {userID = msg.content.split(' ').splice(1).join(' ').replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '')}
        var createdat = new Date(client.users.get(userID).createdAt);
        var joinedat = new Date(msg.channel.guild.members.get(userID).joinedAt);
        var type = '';
        if (client.users.get(userID).avatarURL.includes('gif')) {
            type = 'gif'
        }else {type = 'png'}
        var status = '';
        var gameType = '';
        var gameName = '';
        if (msg.channel.guild.members.get(userID).game === null) {gameType = 'Just';gameName = 'Nothing';}else if (msg.channel.guild.members.get(userID).game.type === 0) {gameType = 'Playing';gameName = msg.channel.guild.members.get(userID).game.name;}else if (msg.channel.guild.members.get(userID).game.type === 1) {gameType = 'Streaming';gameName = msg.channel.guild.members.get(userID).game.name;}else if (msg.channel.guild.members.get(userID).game.type === 2) {gameType = 'Listening To';gameName = msg.channel.guild.members.get(userID).game.name;}else if (msg.channel.guild.members.get(userID).game.type === 3) {gameType = 'Watching';gameName = msg.channel.guild.members.get(userID).game.name;}
        if (msg.channel.guild.members.get(userID).status === 'online') {status = '<:online:479044155184513047>'}else if (msg.channel.guild.members.get(userID).status === 'idle') {status = '<:idle:479044059134951425>'}else if (msg.channel.guild.members.get(userID).status === 'dnd') {status = '<:dnd:479044022757883907>'}else if (msg.channel.guild.members.get(userID).status === 'offline') {status = '<:offline:479044084829257753>'}
        client.createMessage(msg.channel.id, {
            content: `Info for user\nUsername: \`${client.users.get(userID).username}#${client.users.get(userID).discriminator}\`\nID: \`${client.users.get(userID).id}\`\nAre They a Bot?: \`${client.users.get(userID).bot}\`\nNickname in server (if set): \`${msg.channel.guild.members.get(userID).nick ? msg.channel.guild.members.get(userID).nick : 'None'}\`\nCreated account at: \`${createdat}\`\nJoined At: \`${joinedat}\`\nStatus: ${msg.channel.guild.members.get(userID).status} ${status}\nGame: \`${gameType} ${gameName}\`\nProfile Picture:`,
            embed: {
                image: {
                    url: client.users.get(userID).dynamicAvatarURL(type, 1024)
                }
            }
        });
    }catch (err) {
        client.createMessage(msg.channel.id, 'It appears that the user you are trying to get info about is not in this server, please go into the server that the user is in to get their info')
    }
}, {
    fullDescription: 'get user info',
    usage: '(blank for yourself|@user|user id)'
});
client.registerCommandAlias('e621', 'e6')
client.registerCommand('r34', (msg) => {
    cmdsRan = ++cmdsRan
    var tags = msg.content.split(' ').splice(1).join('+')
    try {
        if (msg.channel.nsfw) {
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
}, {
    fullDescription: 'search for any kind of porn',
    usage: '(tag tag_with_spaces)'
});
client.registerCommand('serverinfo', (msg) => {
    cmdsRan = ++cmdsRan
    var loop = true;
    var emojis = msg.channel.guild.emojis.map(e => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`).join(', ');
    client.createMessage(msg.channel.id, 'Alright, Lemme open Inspect Element on this server').then((message) => {
        client.sendChannelTyping(msg.channel.id)
        var y = 0;
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
}, {
    fullDescription: 'shows info about the current server'
});
client.registerCommandAlias('rule34', 'r34')
client.registerCommand('amiowner', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        return 'Ahh, yes, I remember you, your ' + msg.author.username + '#' + msg.author.discriminator + ', your my dad (I got no mom)'
    }else {
        return 'PFFFT, No you ain\'t the heccing owner <:DABBIT:478982290530107392>'
    }
}, {
    fullDescription: 'Are you the owner?'
});
client.registerCommand('getemoji', (msg) => {
    cmdsRan = ++cmdsRan
    var emojiID = msg.content.split(' ').splice(1).join(' ').split(':').splice(2).join(':').replace(/>/g, '')
    if (emojiID.length == 0) {
        return 'This emoji is either not a custom emoji, or is not accessable.'
    }else {
        client.createMessage(msg.channel.id, {
            embed: {
                title: 'Custom Server Emoji (click here for link to emoji)',
                url: `https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`,
                image: {
                    url: `https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`
                }
            }
        });
    }
}, {
    fullDescription: 'retrieves custom server emojis.',
    usage: '(custom emoji or emoji id)'
});
client.registerCommand('howcool', (msg) => {
    cmdsRan = ++cmdsRan
    var amountOfCool = 0;
    var howCoolCommand = msg.content.split(' ').splice(1).join(' ')
    if (howCoolCommand.includes('222882552472535041')) {
        amountOfCool = 200;
    }else {
        amountOfCool = Math.floor(Math.random() * 101);
    }
    if (amountOfCool === 0) {
        client.createMessage(msg.channel.id, howCoolCommand + ' is not cool.')
    }else {
        if (amountOfCool === 69) {
            client.createMessage(msg.channel.id, howCoolCommand + ' is: ' + amountOfCool + '% cool ( ͡° ͜ʖ ͡°)\n' + '😎'.repeat(amountOfCool))
        }else {
            client.createMessage(msg.channel.id, howCoolCommand + ' is: ' + amountOfCool + '% cool\n' + '😎'.repeat(amountOfCool))
        }
    }
}, {
    fullDescription: 'howcool.',
    usage: '(literally anything)'
});
client.registerCommand('dicklength', (msg) => {
    cmdsRan = ++cmdsRan
    var dicklength1 = Math.floor(Math.random() * 101);
    var dicklength2 = Math.floor(Math.random() * 100);
    client.createMessage(msg.channel.id, `Your dick length is ${dicklength1}.${dicklength2} inches long.`)
}, {
    fullDescription: 'Shows your accurate dick length',
});
client.registerCommand('duck', (msg) => {
    cmdsRan = ++cmdsRan
    var duckSearch = {
            url: 'https://e621.net/post/index.json?tags=order:random+rating:s+duck',
            headers: {
                'User-Agent': `EagleBot-Eris/${process.version} (by CantCreative on e621)`
            }
        }
    client.sendChannelTyping(msg.channel.id)
    request(duckSearch, (error, res, body) => {
        if (!error && res.statusCode == 200) {
            var duckSearchResults = JSON.parse(body);
            if(typeof (duckSearchResults[0]) != "undefined") {
                msg.channel.createMessage({
                    embed: {
                        title: 'Here is your duck kind sir. This duck has been voted for President ' + duckSearchResults[0].score + ' times',
                        url: 'https://e621.net/post/show/' + duckSearchResults[0].id.toString(),
                        image: {
                            url: duckSearchResults[0].file_url.toString()
                        }
                    }
                })
            }else {
                msg.channel.createMessage('notfin, idk if i looked for the right stuff.')
            }
        }else {
            msg.channel.createMessage('I tried talkin to e621, but they told me to go away.')
        }
    });
}, {
    fullDescription: 'random picture of a duck, courtesy of e621'
});
client.registerCommand('poll', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageMessages')) {
        var options = msg.content.split(' ').splice(1).join(' ').split('|')
        var channel = ''
        if (options[3] !== undefined) {
            channel = options[3].replace(/<#/g, '').replace(/>/g, '').replace(/ /g, '')
        }else {
            channel = msg.channel.id
        }
        client.createMessage(channel, {
            content: `${msg.author.username}#${msg.author.discriminator} has made a new poll \`${options[0]}\`\n:thumbsup: for: ${options[1]}\n:thumbsdown: for: ${options[2]}`,
            disableEveryone: false
        }).then((message) => {
            client.addMessageReaction(message.channel.id, message.id, '👍')
            client.addMessageReaction(message.channel.id, message.id, '👎')
        }, () => {
            client.createMessage(msg.channel.id, 'I can\'t say anything there so oof')
        });
    }else if (creatorID.includes(msg.author.id)) {
        var options = msg.content.split(' ').splice(1).join(' ').split('|')
        var channel = ''
        if (options[3] !== undefined) {
            channel = options[3].replace(/<#/g, '').replace(/>/g, '').replace(/ /g, '')
        }else {
            channel = msg.channel.id
        }
        client.createMessage(channel, {
            content: `${msg.author.username}#${msg.author.discriminator} has made a new poll \`${options[0]}\`\n:thumbsup: for: ${options[1]}\n:thumbsdown: for: ${options[2]}`,
            disableEveryone: false
        }).then((message) => {
            client.addMessageReaction(message.channel.id, message.id, '👍')
            client.addMessageReaction(message.channel.id, message.id, '👎')
        }, () => {
            client.createMessage(msg.channel.id, 'I can\'t say anything there so oof')
        });
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
    }
}, {
    fullDescription: 'creates a poll',
    usage: '(question) | (option 1) | (option 2) | [channel]'
});
client.registerCommand('spinner', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.content.split(' ')[1] === undefined) {
        var displayTime = 0;
        var spinTime = 0
        readWal(msg.author.id).then((wal) => {
            switch(wal.spinner) {
                case '0':
                    displayTime = Math.floor(Math.random() * 277);
                    spinTime = displayTime * 1000
                break;
                case '1':
                    displayTime = Math.floor(Math.random() * 455);
                    spinTime = displayTime * 1000
                break;
                case '2':
                    displayTime = Math.floor(Math.random() * 633);
                    spinTime = displayTime * 1000
                break;
            }
        }, () => {
            updateWal(msg.author.id, 0, 0)
            displayTime = Math.floor(Math.random() * 277);
            spinTime = displayTime * 1000
        });
        client.createMessage(msg.channel.id, 'I spun your spinner! let\'s see how long it spins for!').then((message) => {
            setTimeout(() => {
                client.editMessage(message.channel.id, message.id, `Wow, your spinner spun for ${displayTime.toString().toHHMMSS()}!`)
            }, spinTime);
        })
    }else if (msg.content.split(' ')[1] === 'upgrade') {
        readWal(msg.author.id).then((wal) => {
            switch(wal.spinner) {
                case '0':
                    if (parseInt(wal.money) < 1000) {
                        msg.channel.createMessage(`You can't upgrade your fidget spinner! you need ${1000 - parseInt(wal.money)} more e-bucks!`)
                    }else {
                        updateWal(msg.author.id, parseInt(wal.money) - 1000, parseInt(wal.spinner) + 1)
                        msg.channel.createMessage('1000 e-bucks have been taken from your account, you now have ' + (parseInt(wal.money) - 1000) + ' e-bucks and your fidget spinner has been upgraded to level 1!')
                    }
                break;
                case '1':
                    if (parseInt(wal.money) < 5000) {
                        msg.channel.createMessage(`You can't upgrade your fidget spinner! you need ${5000 - parseInt(wal.money)} more e-bucks!`)
                    }else {
                        updateWal(msg.author.id, parseInt(wal.money) - 5000, parseInt(wal.spinner) + 1)
                        msg.channel.createMessage('5000 e-bucks have been taken from your account, you now have ' + (parseInt(wal.money) - 5000) + ' e-bucks and your fidget spinner has been upgraded to level 2!')
                    }
                break;
                case '2':
                    msg.channel.createMessage('Your spinner is at max!')
                break;
            }
        }, () => {
            updateWal(msg.author.id, 0, 0)
            msg.channel.createMessage('You can\'t upgrade your fidget spinner! you need 1000 more e-bucks!')
        });
    }
}, {
    fullDescription: 'spin a fidget spinner, use the economy to upgrade your spinner!',
});
client.registerCommand('reverse', (msg) => {
    cmdsRan = ++cmdsRan
    var reversed = msg.content.split(' ').splice(1).join(' ').split('').reverse().join('')
    return reversed;
}, {
    fullDescription: 'reverses text',
    usage: '(stuff)'
});
client.registerCommand('tcp', (msg) => {
    cmdsRan = ++cmdsRan
    var tcpargs = msg.content.split(' ').splice(1)
    switch(tcpargs[0]) {
        case 'connect':
            if (tcpOwner === '') {
                tcpClient.connect(tcpargs[2], tcpargs[1], function() {
                    client.createMessage(msg.channel.id, `Connected to host: ${tcpargs[1]}:${tcpargs[2]}.`)
                    client.getDMChannel(msg.author.id).then((message) => {
                        tcpOwner = message.id;
                        tcpOwnerID = msg.author.id;
                    });
                });
                tcpClient.on('error', (err) => {
                    client.createMessage(msg.channel.id, 'Unable to connect')
                });
            }else {
                client.createMessage(msg.channel.id, 'The TCP client is in use right now!')
            }
        break;
        case 'send':
            if (tcpOwner !== '' && tcpOwnerID === msg.author.id) {
                tcpClient.write(tcpargs.splice(1).join(' '))
                client.createMessage(msg.channel.id, 'Sent!')
            }else if (tcpOwnerID === '') {
                client.createMessage(msg.channel.id, 'The TCP client is not connected right now! use `a}tcp connect <ip> <port>` to connect!')
            }else {
                client.createMessage(msg.channel.id, 'You are not the owner of the TCP Client!')
            }
        break;
        case 'disconnect':
            if (tcpOwnerID !== '' && tcpOwnerID === msg.author.id) {
                tcpClient.destroy();
            }else if (tcpOwnerID !== msg.author.id) {
                client.createMessage(msg.channel.id, 'You are not the owner of the current session!')
            }
    }
}, {
    fullDescription: 'A TCP Client!',
    usage: '(connect|send|disconnect)'
});
tcpClient.on('data', (data) => {
    client.createMessage(tcpOwner, 'Message from Server: ' + data)
});
tcpClient.on('close', () => {
    client.createMessage(tcpOwner, 'The connection closed! Ownership of the session will be removed from you!')
    tcpOwner = ''
    tcpOwnerID = ''
});
client.registerCommand('payrespects', (msg) => {
    cmdsRan = ++cmdsRan
    var f = msg.content.split(' ').splice(1).join(' ');
    var payedRespects = '';
    msg.channel.createMessage(`ALRIGHT PEOPLE, ${msg.author.username} Asked us to pay respects to **${f}** So do that by pressing F.`).then((message) => {
        message.addReaction('🇫')
        client.on('messageReactionAdd', (mossage, emoji, userID) => {
            if (mossage.id === message.id && emoji.name === '🇫' && payedRespects.includes(userID) === false && userID !== client.user.id) {
                message.channel.createMessage(`**${client.users.get(userID).username}** paid respects to **${f}**`)
                payedRespects = payedRespects + ',' + userID
            }
        });
    });

}, {
    fullDescription: 'Press F to Pay respects',
    usage: '(thing to pay respects to)'
});
client.registerCommand('help', () => {
    cmdsRan = ++cmdsRan
    return 'goto http://plsdab.asuscomm.com/info/commands for commands';
}, {
    fullDescription: 'this help text'
})
client.registerCommandAlias('hlep', 'help')
client.registerCommandAlias('halp', 'help')
client.registerCommandAlias('heIp', 'help')
client.registerCommand('daily', (msg) => {
    cmdsRan = ++cmdsRan
    readWal(msg.author.id).then((wal) => {
        updateWal(msg.author.id, parseInt(wal.money) + 200, wal.spinner)
        msg.channel.createMessage('You have earned 200 e-bucks! Wait 18 hours before using the command again.')
    }, () => {
        updateWal(msg.author.id, 200, 0)
        msg.channel.createMessage('You have earned 200 e-bucks! Wait 18 hours before using the command again.')
    });
}, {
    fullDescription: 'daily money command, useable every 18 hours.',
    cooldown: 64800000,
    cooldownMessage: 'You can\'t use the daily command again, wait at least 18 hours!'
});
client.registerCommand('wallet', (msg) => {
    cmdsRan = ++cmdsRan
    var walletID = ''
    if (msg.content.split(' ')[1] !== undefined) {
        walletID = msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')
    }else {walletID = msg.author.id}
    readWal(walletID).then((wal) => {
        if (walletID === msg.author.id) {
            client.createMessage(msg.channel.id, `You have ${wal.money} e-bucks and a level ${wal.spinner} fidget spinner.`)
        }else if (walletID !== msg.author.id) {
            client.createMessage(msg.channel.id, `${client.users.get(walletID).username} has ${wal.money} e-bucks and a level ${wal.spinner} fidget spinner.`)
        }
    }, () => {
        if (walletID !== msg.author.id) {
            msg.channel.createMessage('I cannot find a wallet linked with that ID')
        }else {
            updateWal(msg.author.id, 0, 0)
            msg.channel.createMessage('You have 0 e-bucks and a level 0 fidget spinner.')
        }
    });
}, {
    fullDescription: 'Shows how much e-bucks you or another person has'
})
client.registerCommand('givemoney', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        var username = ''
        var valid = true;
        try {
            username = client.users.get(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username
        }catch(err) {
            if (err) {
                valid = false;
                return 'Not a valid user!'
            }
        }
        if (valid) {
            readWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).then((nonExecWal) => {
                updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(nonExecWal.money) + parseInt(msg.content.split(' ')[2]), nonExecWal.spinner)
                msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
            }, (err) => {
                updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(msg.content.split(' ')[2]), 0)
                msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
            });
        }
    }else {
        var username = ''
        var valid = true;
        try {
            username = client.users.get(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username
        }catch(err) {
            if (err) {
                valid = false;
                return 'Not a valid user!'
            }
        }
        if (valid) {
            readWal(msg.author.id).then((cmdExecWal) => {
                if (parseInt(cmdExecWal.money) < parseInt(msg.content.split(' ')[2])) {
                    msg.channel.createMessage(`You do not have enough e-bucks to give ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                }else if (msg.content.split(' ')[2].includes('-') === false) {
                    readWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).then((nonExecWal) => {
                        updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(nonExecWal.money) + parseInt(msg.content.split(' ')[2]), nonExecWal.spinner)
                        updateWal(msg.author.id, parseInt(cmdExecWal.money) - parseInt(msg.content.split(' ')[2]), cmdExecWal.spinner)
                        msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                    }, (err) => {
                        updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(msg.content.split(' ')[2]), 0)
                        updateWal(msg.author.id, parseInt(cmdExecWal.money) - parseInt(msg.content.split(' ')[2]), cmdExecWal.spinner)
                        msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                    });
                } else {
                    msg.channel.createMessage(`Can you don't use \`-\` in your givemoney command, that steals the other users e-bucks!`)
                }
            }, (err) => {
                updateWal(msg.author.id, 0, 0)
                msg.channel.createMessage(`You do not have enough e-bucks to give ${username} ${msg.content.split(' ')[2]} e-bucks!`)
            });
        }
    }           
}, {
    fullDescription: 'give e-bucks to other users!',
    usage: '(user mention) (money)'
});
client.registerCommand('giveaway', (msg) => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('manageMessages') || creatorID.includes(msg.author.id)) {
        var args = msg.content.split(' ').splice(1).join(' ').split('|')
        var channelID = ''
        if (args[2] !== undefined) {
            channelID = args[2].replace(/<#/g, '').replace(/>/g, '').replace(/ /g, '')
        }else {
            channelID = msg.channel.id
        }
        if (parseInt(args[1]) < 432000) {
            client.createMessage(channelID, `${msg.author.username} has created a giveaway!\nThe reward for winning is ${args[0]}!\nThe giveaway will last ${args[1]} seconds!\nReact with 🎉 to enter!`).then((msg) => {
                msg.addReaction('🎉')
                setTimeout(() => {
                    msg.getReaction('🎉').then(re => {
                        re = re.filter(re => re.id !== client.user.id)
                        if (re[1] !== undefined) {
                            msg.channel.createMessage(`<@${re[Math.floor(Math.random() * re.length)].id}> has won ${args[0]}!`)
                        }else {
                            msg.channel.createMessage(`Hmmm.. it looks like no one won ${args[0]}. This is so sad Alexa play Despacito by Luis Fonsi.`)
                        }
                    })
                }, parseInt(args[1]) * 1000)
            })
        }else {
            msg.channel.createMessage('I can\'t handle that long to wait for a giveaway, sorry!')
        }
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
    }
}, {
    fullDescription: 'Create Giveaways!',
    usage: '(item to win)|(time in seconds)|[channel]'
});
client.registerCommand('sudo', (msg) => {
    cmdsRan = ++cmdsRan
    if (creatorID.includes(msg.author.id)) {
        var args = msg.content.split(' ').splice(1)
        var userID = args[0].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')
        msg.channel.createMessage(`Executing \`${args[1]}\` as \`${client.users.get(userID).username}\`.`)
        var command = args[1]
        if (msg.channel.guild.members.get(userID) !== undefined) {
            msg.member = msg.channel.guild.members.get(userID)
        }
        msg.author = client.users.get(userID)
        msg.content = `a}${args.splice(1).join(' ')}`
        client.resolveCommand(command).executeCommand(msg).then(f => {
            if (f !== undefined) {
                msg.channel.createMessage(f)
            }
        });
    }else {
        return 'You need the permission `BOT_OWNER` to use this command!';
    }
}, {
    fullDescription: 'executes commands as other users (owner only)',
    usage: '(userID) (command) [command args]'
});
client.registerCommand('ytsearch', msg => {
    cmdsRan = ++cmdsRan
    var ytSearch = {
    'url': `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${msg.content.split(' ').splice(1).join(' ')}&safeSearch=strict&type=video&key=${u_wut_m8.ytauth}&maxResults=50`,
    'headers': {
        'User-Agent': `EagleNugget/${process.version} (AlekEagle YT on Google)`
        }
    }
    request(ytSearch, (error, res, body) => {
         if (!error && res.statusCode === 200) {
            var ytSearchRes = JSON.parse(body);
            var randomizer = parseInt(ytSearchRes.items.length)
            if (randomizer > 50) {randomizer = 50}
            if (ytSearchRes.items.length !== 0) {
                var vidChooser = Math.floor(Math.random() * randomizer);
                if (vidChooser === 50) {vidChooser = 49}
                msg.channel.createMessage({
                    embed: {
                        title: `${ytSearchRes.items[vidChooser].snippet.title} by ${ytSearchRes.items[vidChooser].snippet.channelTitle}`,
                        description: `${ytSearchRes.items[vidChooser].snippet.description}`,
                        image: {
                            url: `https://i.ytimg.com/vi/${ytSearchRes.items[vidChooser].id.videoId}/hqdefault.jpg`
                        },
                        url: `https://youtu.be/${ytSearchRes.items[vidChooser].id.videoId}`
                    }
                })
            }else {
                return 'I smell no videos by that name.'
            }
        }
    })
}, {
    fullDescription: 'Search Youtube videoss!',
    usage: '(search term)'
});
client.registerCommand('joinwarn', msg => {
    cmdsRan = ++cmdsRan
    if (msg.member.permission.has('kickMembers') || creatorID.includes(msg.author.id)) {
        var userID = msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')
        fs.appendFile(`./join_warns/${msg.channel.guild.id}.txt`, `,${userID}`, (err) => {
            if (err) {
                msg.channel.createMessage('an error occured while saving the user');
            }else {
                msg.channel.createMessage('Saved!');
            }
        });
    }else {
        client.createMessage(msg.channel.id, 'I\'m afraid I can\'t do that. In order for me to do that for you, I need to know that you are allowed to do that kind of stuff and the boss (owner) knows you can, so to do this you need the permission `MANAGE_MESSAGES`.')
    }
}, {
    fullDescription: 'Adds users to the join warns list. THIS WILL WARN ALL USERS IN THE SERVER WITH KICK_MEMBERS PERMISSION',
    usage: '(userID)'
});
client.registerCommand('notresponding', msg => {
    cmdsRan = ++cmdsRan
    var thing = ''
    if (msg.content.split(' ').splice(1)[0] !== undefined) {
        thing = msg.content.split(' ').splice(1).join(' ')
        try {
            if (client.users.get(thing.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username !== undefined) {
                thing = client.users.get(thing.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username;
            }
        }catch (err) {
            thing = msg.content.split(' ').splice(1).join(' ')
        }
    }else {
        thing = msg.author.username
    }
    return `**${thing}.exe is not responding**\n*If you close the program, you may lose information.*\n➡Close the program\n➡Wait for the program to respond`;
}, {
    fullDescription: '___ is not responding, go nuts!',
    usage: '(thing)'
});
<<<<<<< HEAD
client.registerCommand('play', msg => {
    var args = msg.content.split(' ').splice(1)
    let voiceChannel =msg.member.guild.channels.get(msg.member.voiceState.channelID);
    if (!msg.member.voiceState.channelID) {
        msg.channel.createMessage('You heff to join a voice channel lol.');
        return;
    }else if (!voiceChannel.permissionsOf(client.user.id).has('voiceConnect')) {
        msg.channel.createMessage('I heff to be able to join the voice channel with you lol.');
        return;
    }else if (!voiceChannel.permissionsOf(client.user.id).has('voiceSpeak')) {
        msg.channel.createMessage('I heff to be able to __play__ the music yknow? Not just be some random bot sitting a voice channel with you, being absloutely silent, since I can\'t speak in there.');
        return;
    }else if (!msg.content.split(' ').splice(1).join(' ')) {
        msg.channel.createMessage('Umm, what do you want me to play? Thats the only function of this command after all.');
        return;
    }else if (!musicUtils.servers[msg.member.guild.id]) {
        musicUtils.servers[msg.member.guild.id] = {
            queue : []
        };
    }

    let searchQuery = 'ytsearch:';

    if (args[0] === 'search') {
        for (let i = 1; i < args.length; i++) {
            searchQuery += args[i] + ' ';
        }
    }else {
        searchQuery = args[0];
    }

    musicUtils.getInfo(client, console, msg, voiceChannel, searchQuery);
}, {
    fullDescription: 'Play music!',
    usage: '(search {search terms}|URL)',
    guildOnly: true
=======
//client.registerCommand('play', msg => {
//    var args = msg.content.split(' ').splice(1)
//    let voiceChannel =msg.member.guild.channels.get(msg.member.voiceState.channelID);
//    if (!msg.member.voiceState.channelID) {
//        msg.channel.createMessage('You heff to join a voice channel lol.');
//        return;
//    }else if (!voiceChannel.permissionsOf(client.user.id).has('voiceConnect')) {
//        msg.channel.createMessage('I heff to be able to join the voice channel with you lol.');
//        return;
//    }else if (!voiceChannel.permissionsOf(client.user.id).has('voiceSpeak')) {
//        msg.channel.createMessage('I heff to be able to __play__ the music yknow? Not just be some random bot sitting a voice channel with you, being absloutely silent, since I can\'t speak in there.');
//        return;
//    }else if (!msg.content.split(' ').splice(1).join(' ')) {
//        msg.channel.createMessage('Umm, what do you want me to play? Thats the only function of this command after all.');
//        return;
//    }else if (!musicUtils.servers[msg.member.guild.id]) {
//        musicUtils.servers[msg.member.guild.id] = {
//            queue : []
//        };
//    }
//
//    let searchQuery = 'ytsearch:';
//
//    if (args[0] === 'search') {
//        for (let i = 1; i < args.length; i++) {
//            searchQuery += args[i] + ' ';
//        }
//    }else {
//        searchQuery = args[0];
//    }
//
//    musicUtils.getInfo(client, console, msg, voiceChannel, searchQuery);
//}, {
//    fullDescription: 'Play music!',
//    usage: '(search {search terms}|URL)',
//    guildOnly: true
//});
client.registerCommand('fakecopypasta', msg => {
    var username = '',
        discriminator = '';
    try {
        username = client.users.get(msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username;
        discriminator = client.users.get(msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).discriminator;
    }catch (err) {
        return 'That user is invalid!';
    }
    msg.channel.createMessage(`Look out for a Discord user by the name of "${username}" with the tag #${discriminator}. He is going around sending friend requests to random Discord users, and those who accept his friend requests will have their accounts DDoSed and their groups exposed with the members inside it becoming a victim aswell. Spread the word and send this to as many discord servers as you can. If you see this user, DO NOT accept his friend request and immediately block him.\nOur team is currently working very hard to remove this user from our database, please stay safe.\n\n-Discord team.`)
});
client.registerCommand('e9', (msg) => {
    cmdsRan = ++cmdsRan
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
}, {
    fullDescription: 'you can search for safe furry stuff on here (BE WARNED THAT IT MAY NOT BE 100% SAFE ON HOW YOU INTERPRET IT!)',
    usage: '(search terms for stuff)'
>>>>>>> a18fe0a5e71252fc220898c71724d27cc37db5f4
});
clickbait('../node server/info/theinfostuff/cmds.txt', Object.values(client.commands).map(c => `${c.label} ${c.usage}<br>${c.fullDescription}<br>Aliases: ${c.aliases[0] ? c.aliases.join(', ') : 'none'}`).join('<br><br>'))
fs.readdir('./good_memes_probably/', (err, files) => {
    clickbait('../node\ server/info/theinfostuff/memes.txt', files.join(', ').replace(/.meme/g, ''))
});
clickbait('../node server/info/theinfostuff/guilds.txt', client.guilds.size)
client.connect();
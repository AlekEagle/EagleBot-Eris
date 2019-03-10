const Eris = require('eris');
const fs = require('fs');
const u_wut_m8 = require('./.auth.json');
const DBL = require('dblapi.js');
const request = require('request');
const cors = require('cors')
let nums = require('./functions/numbers');
let manager = require('./functions/blacklistManager');
let eco = require('./functions/economy');
let guilds = require('./functions/getGuilds');
let toHHMMSS = require('./functions/toReadableTime');
let stats = require('./functions/commandStatistics');
const os = require('os');
let i = 0;
var corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const options = {
    key: fs.readFileSync('../node_server/alekeagle.tk.key'),
    cert: fs.readFileSync('../node_server/alekeagle.tk.pem')
  }
const dbl = new DBL(u_wut_m8.dblToken, {});
manager.manageBlacklist({action: 'refresh', blklist: 'gblk'}).then(list => {
    console.log(`Loaded global user blacklist. There are currently ${list.users.length} user entry(s).`);
}, (err) => {
    console.error(err)
});
eco.initializeEconomy().then(size => {
    console.log(`Loaded economy. There are currently ${size} economy entries.`)
})
function nextShard() {
    console.log(`Connecting to shard ${i}`);
    const client = new Eris.CommandClient(u_wut_m8.token, {
        firstShardID: i,
        lastShardID: i,
        maxShards: nums.shardCount,
        getAllUsers: true
    }, {
        description: 'EagleNugget in Eris form.',
        owner: 'AlekEagle#0001',
        prefix: 'a}',
        defaultHelpCommand: false
    });
    function onDBLVote(data) {
        client.getDMChannel(data.user).then(msg => {
            msg.createMessage("Oh hecc you voted! Thanks! This helps me a lot!")
        }, () => {
            console.error('Unable to DM user')
        });
    }
    if (i < nums.shardCount) request.post(`https://maker.ifttt.com/trigger/process_started/with/key/${u_wut_m8.iftttToken}`,{
            json: {
                value1: 'EagleNugget',
                value2: i.toString()
            }
        }, () => {
            console.log(`Told IFTTT that shard ${i} started`);
    });
    if (i === 0) {
        let https = require('https')
            app = require('express')()
        app.use(cors(corsOptions))
        let server = https.createServer(options, app);
        app.get('/servers', (req, res) => {
            res.statusCode = 200;
            guilds().then(guilds => {
                res.end(guilds.toString())
            });
        })
        app.get('/cmdsran', (req, res) => {
            res.statusCode = 200;
            res.end(nums.cmdsRan.toString())
        })
        app.get('/msgsread', (req, res) => {
            res.statusCode = 200;
            res.end(nums.msgsRead.toString())
        })
        app.get('/uptime', (req, res) => {
            res.statusCode = 200;
            res.end(`${toHHMMSS(process.uptime().toString())} and ${toHHMMSS(os.uptime().toString())}`)
        })
        app.get('/memory', (req, res) => {
            res.statusCode = 200;
            res.end(Math.floor(process.memoryUsage().rss / 1024 / 1024).toString())
        })
        app.post('/', (req, res) => {
            if (req.headers.authorization === u_wut_m8.webhookpass) {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    body = JSON.parse(body)
                    if (body.bot === '503720029456695306'){
                        request.post(`http://localhost:42030/vote`,{
                            json: body
                        });
                    }else if (body.type === 'test') {
                        console.log(body)
                        onDBLVote(body)
                    }else {
                        onDBLVote(body)
                    }
                    res.end('{"success":"true"}')
                })
            }else {
                res.statusCode = 403;
                res.end('{ "error": "UNAUTHORIZED" }')
            }
        })
        app.get('/commands', (req, res) => {
            res.statusCode = 200;
            setTimeout(() => {
                res.end(Object.values(client.commands).map(c => `${c.hidden ? '' : `<div id="${c.label}">${c.label} ${c.usage ? c.usage : ''}<br>${c.fullDescription}<br>Aliases: ${c.aliases[0] ? c.aliases.join(', ') : 'None'}</div><br><br>`}`).join(''))
            }, 100)
        })
        server.listen(2082)
    }
    client.on('ready', () => {
        console.log(`Connected to shard ${i}`);
        if (i < nums.shardCount) {
            let http = require('http'),
                app = require('express')(),
                server = http.createServer(app);
            app.get('/servers', (req, res) => {
                res.statusCode = 200;
                res.end(client.guilds.size.toString())
            })
            app.post('/vote', (req, res) => {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    body = JSON.parse(body)
                    if (JSON.parse(body).type === 'test') {
                        console.log(JSON.parse(body))
                        onDBLVote(JSON.parse(body))
                    }else {
                        onDBLVote(JSON.parse(body))
                    }
                    res.end('{"success":"true"}')
                })
            })
            app.get('/reloadcmds', (req, res) => {
                Object.values(client.commands).map(c => c.label).forEach(c => {
                    client.unregisterCommand(c);
                });
                var commands = fs.readdirSync('./cmds');
                console.log(`Loading ${commands.length} commands, please wait...`)
                commands.forEach(c => {
                    delete require.cache[require.resolve(`./cmds/${c}`)]
                    var cmdFile = require(`./cmds/${c}`);
                    stats.initializeCommand(cmdFile.name);
                    client.registerCommand(cmdFile.name, (msg, args) => {
                        stats.updateUses(cmdFile.name);
                        cmdFile.exec(client, msg, args);
                    }, cmdFile.options);
                });
                res.end('{ "success": true }')
            });
            app.get('/reloadevts', (req, res) => {
                client.eventNames().forEach(e => {
                    if (e !== 'ready') {
                        var eventlisteners = client.rawListeners(e);
                        if (e === 'messageReactionAdd' || e === 'messageReactionRemove' || e === 'messageCreate') {
                            eventlisteners = eventlisteners.slice(1);
                        }
                        eventlisteners.forEach(ev => {
                            client.removeListener(e, ev);
                        })
                        
                    }
                });
                var events = fs.readdirSync('./events');
                console.log(`Loading ${events.length} events, please wait...`);
                events.forEach(e => {
                    delete require.cache[require.resolve(`./events/${e}`)];
                    var eventFile = require(`./events/${e}`);
                    client.on(eventFile.name, (...args) => {
                        eventFile.exec(client, ...args);
                    });
                });
                res.end('{"success":"true"}')
            });
            app.post('/eval', (req, res) => {
                let nums = require('./functions/numbers');
                let manager = require('./functions/blacklistManager');
                let owners = require('./functions/getOwners');
                let util = require('util');
                let guildCount = require('./functions/getGuilds');
                let eco = require('./functions/economy');
                let prefixes = require('./functions/getPrefixes');
                let toHHMMSS = require('./functions/toReadableTime');
                let genRanString = require('./functions/genRanString');
                let stats = require('./functions/commandStatistics');
                let music = require('./functions/musicUtils');
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        let evaluation = eval(body);
                        if (typeof evaluation !== "string") {
                            evaluation = util.inspect(evaluation).replace(client.token, '(insert token here)')
                        }else {
                            evaluation = evaluation.replace(client.token, '(insert token here)')
                        }
                        if (evaluation.length > 2000) {
                            fs.writeFile('/home/pi/node_server/root/eval_out/eval_output.txt', evaluation.replace(/\n/g, '<br>'), (err) => {
                                if (err != undefined) {
                                    res.end('An error occurred while this action was being preformed error code: `' + err.code + '`')
                                }
                            });
                            res.end('Output too large, it should be on your website at https://alekeagle.tk/eval_out')
                        }else {
                            res.end(evaluation)
                        }
                    } catch (err) {
                        res.end('OOF ERROR:\ninput: ```' + evalCommand + '``` output: ```' + err + '```')
                    }
                })
            })
            server.listen(parseInt(`3203${i}`))
        }
        if (i < nums.shardCount) {
            request.post(`https://maker.ifttt.com/trigger/bot_restarted/with/key/${u_wut_m8.iftttToken}`,{
                json: {
                    value1: 'EagleNugget',
                    value2: client.guilds.map(g => g)[0].shard.id.toString()
                }
            }, () => {
                console.log(`Told IFTTT that shard ${client.guilds.map(g => g)[0].shard.id} connected`);
                i ++
                if (i < nums.shardCount) nextShard()
            });
        }else {
            request.post(`https://maker.ifttt.com/trigger/bot_reconnected/with/key/${u_wut_m8.iftttToken}`,{
                json: {
                    value1: 'EagleNugget',
                    value2: client.guilds.map(g => g)[0].shard.id.toString()
                }
            }, () => {
                console.log(`Told IFTTT that shard ${client.guilds.map(g => g)[0].shard.id} reconnected`);
            });
        }
        client.editStatus('online', {
            type: 0,
            name: `something idk`
        });
        setInterval(() => {
            dbl.postStats(client.guilds.size, client.guilds.map(g => g)[0].shard.id, nums.shardCount);
        }, 300000);
        dbl.postStats(client.guilds.size, client.guilds.map(g => g)[0].shard.id, nums.shardCount);
    });
    var events = fs.readdirSync('./events');
    console.log(`Loading ${events.length} events, please wait...`)
    events.forEach(e => {
        var eventFile = require(`./events/${e}`);
        client.on(eventFile.name, (...args) => {
            eventFile.exec(client, ...args)
        })
    })
    var commands = fs.readdirSync('./cmds');
    console.log(`Loading ${commands.length} commands, please wait...`)
    commands.forEach(c => {
        var cmdFile = require(`./cmds/${c}`);
        stats.initializeCommand(cmdFile.name);
        client.registerCommand(cmdFile.name, (msg, args) => {
            stats.updateUses(cmdFile.name);
            cmdFile.exec(client, msg, args);
        }, cmdFile.options);
    })
    client.connect();
}
nextShard()
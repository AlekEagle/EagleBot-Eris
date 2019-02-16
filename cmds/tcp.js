'use strict';

const net = require('net')
let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let prefixes = require('../functions/getPrefixes');
let clients = []

module.exports = {
    name: 'tcp',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            switch(args[0]) {
                case 'connect':
                    if (clients[msg.author.id]) msg.channel.createMessage(`You already have an active client! To send data with it, use \`${prefixes(client, (msg.channel.guild ? msg.channel.guild.id : msg.channel.id))}tcp send <data>\``);
                    else {
                        var connectionLocation = args[1].split(':')
                        clients[msg.author.id] = new net.Socket()
                        clients[msg.author.id].connect(connectionLocation[1], connectionLocation[0], () => {
                            msg.channel.createMessage(`Connected! To send data with it, use \`${prefixes(client, (msg.channel.guild ? msg.channel.guild.id : msg.channel.id))}tcp send <data>\``)
                        });
                        clients[msg.author.id].on('error', (err) => {
                            var errorHandled = false
                            client.getDMChannel(msg.author.id).then(dm => {
                                switch(err.code) {
                                    case 'ECONNRESET':
                                        dm.createMessage('This error is not common, this error usually occurs when the server either crashes or when the server closes while sending data. Socket was destroyed.');
                                        errorHandled = true;
                                    break;
                                    case 'ETIMEDOUT':
                                        dm.createMessage('An error occurred, either the connection request took too long to reach the server, or the server took too long to confirm the connection. Socket was destroyed.');
                                        errorHandled = true;
                                    break;
                                    case 'ECONNREFUSED':
                                        dm.createMessage('An error occurred, the server is not accepting requests at this moment. Socket was destroyed');
                                        errorHandled = true;
                                    break;
                                }
                                if (!errorHandled) {
                                    dm.createMessage('An unknown error occurred. Socket was destroyed.')
                                }
                            });
                            clients[msg.author.id].destroy()
                            clients[msg.author.id] = null;
                        });
                        clients[msg.author.id].on('data', (data) => {
                            client.getDMChannel(msg.author.id).then(dm => {
                                dm.createMessage('Message from Server: `' + data + '`')
                            });
                        });
                        clients[msg.author.id].on('close', (hadError) => {
                            if (!hadError) {
                                client.getDMChannel(msg.author.id).then(dm => {
                                    dm.createMessage('Server disconnected. Socket was destroyed.')
                                    if (clients[msg.author.id]) {
                                        clients[msg.author.id].destroy()
                                        clients[msg.author.id] = null;
                                    }
                                });
                            }
                        });
                    }
                break;
                case 'send':
                    if (clients[msg.author.id]) {
                        clients[msg.author.id].write(args.slice(1).join(' '));
                        msg.channel.createMessage('Sent!')
                    }else msg.channel.createMessage(`You don't have an active client! To create one, use \`${prefixes(client, msg.channel.guild.id)}tcp connect <IP:PORT>\``);
                break;
                case 'disconnect': 
                    clients[msg.author.id].destroy()
                    clients[msg.author.id] = null;
                break;
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
        fullDescription: 'A TCP Client! (Note: you will need to allow the bot to send DMs to you',
        usage: '(connect|send|disconnect)'
    }
}
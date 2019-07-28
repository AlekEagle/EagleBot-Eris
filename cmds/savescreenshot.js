'use strict';

let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');
const Logger = require('./functions/logger');
const console = new Logger();

module.exports = {
    name: 'savescreenshot',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (owners.isOwner(msg.author.id)) {
                var name = genRanString(10);
                exec(`wget ${msg.attachments[0].url}`, () => {
                    fs.copyFile(`./${msg.attachments[0].url.split('/')[6]}`, `../node_server/root/screenshots/${name}.${msg.attachments[0].url.split('/')[6].split('.')[1]}`, (err) => {
                        if (err) {
                            msg.channel.createMessage('An unknown error occured, please check the console.');
                            console.error(err)
                        }else {
                            msg.channel.createMessage(`https://alekeagle.com/screenshots/${name}.${msg.attachments[0].url.split('/')[6].split('.')[1]}`)
                            fs.unlink(msg.attachments[0].url.split('/')[6]);
                        }
                    })
                })
            }else {
                msg.channel.createMessage('Hmm, you don\'t look like you have the permission `BOT_OWNER` so no command for you')
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
        fullDescription: 'thing',
        hidden: true
    }
}
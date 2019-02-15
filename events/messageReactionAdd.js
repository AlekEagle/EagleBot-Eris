'use strict';

const owners = require('../functions/getOwners')

module.exports = {
    name: 'messageReactionAdd',

    exec: (client, msg, emoji, userID) => {
//    console.log(msg)
//    console.log(emoji)
//    console.log(userID)
    if (msg.channel.guild.members.get(userID).permission.has('manageMessages') && emoji.name === '🗑') {
        cmdsRan = ++cmdsRan
            client.deleteMessage(msg.channel.id, msg.id, 'message reaction deletion').then(() => {}, () => {})
        }else if(owners.isOwner(userID) && emoji.name === '🗑') {
            client.deleteMessage(msg.channel.id, msg.id, 'message reaction deletion by owner').then(() => {}, () => {})
        }
    }
}
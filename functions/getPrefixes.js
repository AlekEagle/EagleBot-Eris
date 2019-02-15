'use strict';

module.exports = (client, guildID) => {
    let prefixes = client.guildPrefixes;
    if (prefixes[guildID] === undefined) {
        return client.commandOptions.prefix;
    }else {
        return prefixes[guildID];
    }
}

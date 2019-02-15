const Map = require('collections/map');
let economy = new Map();

economy.set('222882552472535041', {money: 394830498, spinner: 2})
economy.set('291755459378020352', {money: 5458, spinner: 1})
economy.set('267494526359306241', {money: 544558, spinner: 0})

console.log(`{ "entries": [ ${economy.toJSON().map(e => `[ "${e[0]}", ${JSON.stringify(e[1])} ]`).join(', ')} ] }`)





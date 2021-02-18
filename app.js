const dotenv = require('dotenv')
dotenv.config()

const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	connection: { reconnect: true },
	identity: {
		username: process.env.TWITCH_BOT_NAME,
		password: process.env.TWITCH_TOKEN
	},
	channels: [ 'mertakpinarino' ]
});

client.connect();

var users = []

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;
    console.log(message)

    if(message.toLowerCase() === '!enter' && !users.includes(tags.username)) {
            client.say(channel , `Çekilişe katıldın @${tags.username}`)  
            users.push(tags.username)
            console.log(users)
	}

    if(message.toLowerCase() === '!bitir' && tags.username === 'mertakpinarino'){
        const winnerIndex = Math.floor(Math.random() * users.length)
        const winner = users[winnerIndex]
        client.say(channel , `The winner is @${winner}`)
        users = []
    }
});
	



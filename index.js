// #1 Ouvrir le dossier du bot
// #2 Faire shift+click et ouvrir avec PowerShell
// #3 Faire :
// 	npm i discord.js
// 	npm i fs
// 	npm i ms
// 	npm i moment

const Discord = require('discord.js'):
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');

let prefix = 'r!';
let client = new Discord.Client({DisableEveryone: true});
let bot = client;

client.commands = new Discord.Collection();
// Handler

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  var jsfile = files.filter(f => f.split('.').pop() === 'js');
  if(jsfile.length <= 0){ return console.log("Aucune commande n'a été trouvé.")};
    else { console.log('\n' + jsfile.length + ' commandes trouvées !') };

  console.log("Commandes générales ==========");

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} chargé !`);
    client.commands.set(props.help.name, props);
  });
});

// Event 'ready'

client.on('ready', async () => {

console.log(`====================\n\nConnection ========== \nConnecté en tant que ${client.user.tag} !\n=====================`)

client.user.setActivity(`r!help`, {
  type: "STREAMING",
  url: "https://www.twitch.tv/rayon_de_soleil"
	});
});

client.on("message", async msg => {

  let msgArray = msg.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);
  let cont = msg.content.slice(prefix.length).split(" ");

  if(!msg.content.startsWith(prefix)) return;


  let commandfile = client.commands.get(cont[0]);
  if(commandfile) commandfile.run(client,msg,args);

});
module.exports.run = async (client, msg, args) => {

let pingMsg = await message.channel.send('`Ping...`')
await pingMsg.edit(`<:cassi:536218569378365453> Pong ! \`${client.ping} ms\``);

module.exports.help = {
	name: "ping"
}
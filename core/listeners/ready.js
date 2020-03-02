module.exports = (client) => {
	client.user.setPresence({ activity: { name: `@${client.user.username}` } });
	client.log(`${client.user.tag} (${client.user.id})`, { tags: ['ready'], color: 'green'});

	setTimeout(function activity() {
		const presences = [
			{
				name: client.utils.randomItem(client.config.prefixes),
				type: 'PLAYING'
			}, {
				name: `${client.users.cache.filter((user) => !user.bot && user.presence.status !== 'offline').array().length} Users`,
				type: 'WATCHING'
			}
		];

		for (let i = 0; i < presences.length; i++) {
			((k) => setTimeout(() => client.user.setPresence({ activity: presences[k] }), 1E3 + (60 * 1E3 * k)))(i);
		}

		setTimeout(activity, 60 * presences.length * 1E3);
	}, (Math.random() * 10).toFixed(3) * 1E3);
};
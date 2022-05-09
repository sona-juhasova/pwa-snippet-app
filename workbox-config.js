module.exports = {
	globDirectory: 'app/',
	globPatterns: [
		'**/*.{jsx,js,css}'
	],
	swDest: 'app/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
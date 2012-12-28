/**
 *
 * Project: Get Hired
 * Created by: Bruce Bjorklund
 * Date: 12/12/12
 */
/////////////////////////////////
// Modules
var twitter = require('ntwitter');
var app = require('../app');
/////////////////////////////////
// Global Data
var tweets = [];

/////////////////////////////////
// Twitter API config
var tweetSettings = {};

tweetSettings.maxTweets = 100; // Maximum number of tweets recorded, and sent to the client
tweetSettings.maxClientTweets = 20; // Maximum number of tweets sent to client

var twit = new twitter({
	consumer_key: '5AjGMAuKVhbNyNdnlt4kAw',
	consumer_secret: 'TaFnNJN8cUUCgw6d4XI8DEopdyAKRATtNYSxNzMhFQ',
	access_token_key: '292678112-hDynKPO9xlJBMzsRHpjlSaX2wATNmgSIReqrhQYp',
	access_token_secret: 'VH2vs3cPL1SmagRj6E0BkfADwmOmM0idSZPheQg3xMQ'
});

/////////////////////////////////
// Helper Functions
function checkTweetData()
	{
	if (tweets.length > tweetSettings.maxTweets)
		{
		tweets.pop();
	 	console.log("Getting rid of a tweet");

		if (tweets.length > tweetSettings.maxTweets)	// Recursive, hopefully this doesn't happen too often
			{
			checkTweetData();
			console.log("We have too many tweets! Recursively removing them!");
			}
		}
	}

/////////////////////////////////
// Tweet streaming
twit.stream(
	'statuses/filter',
	{ track: ['arenanet', 'guildwars2', 'guildwars', ['dog']] },
	function(stream)
		{
		stream.on('data', function(tweet)
			{
			console.log('streaming an ew tweet!');
			tweets.unshift(tweet);
			app.io.sockets.emit('tweet', tweet); // Emit the tweet to all connected clients
			checkTweetData();
			});
		}
	);

/////////////////////////////////
// Exports
exports.tweets = tweets;
exports.tweetSeting = tweetSettings;

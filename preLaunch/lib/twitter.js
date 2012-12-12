/**
 *
 * Project: Get Hired
 * Created by: Bruce Bjorklund
 * Date: 12/12/12
 */

var twitter = require('ntwitter');

var twit = new twitter({
	consumer_key: '5AjGMAuKVhbNyNdnlt4kAw',
	consumer_secret: 'TaFnNJN8cUUCgw6d4XI8DEopdyAKRATtNYSxNzMhFQ',
	access_token_key: '292678112-hDynKPO9xlJBMzsRHpjlSaX2wATNmgSIReqrhQYp',
	access_token_secret: 'VH2vs3cPL1SmagRj6E0BkfADwmOmM0idSZPheQg3xMQ'
});

// tweetList: store the latest tweets, since we will be streaming all that is Arena net!
var tweetList = [];

twit.stream(
	'statuses/filter',
	{ track: ['arenanet'] },
	function(stream)
		{
		stream.on('data', function(tweet)
			{
			console.log(tweet.text);
			});
		}
);

/**
 *
 * Project: getAJerb@ArenaNet
 * Created by: bbjorklund
 * Date: 12/12/12
 */
/////////////////////////////////
// Entry point
window.onload = function()
	{
	update();
	};

/////////////////////////////////
// State Machine
var appStates = {};
appStates.loading = 1;
appStates.loaded = 2;
appStates.streaming = 3;
var appState = appStates.loading; // Default state is loading

// State Machine
function update()
	{
	switch(appState)
		{
		case appStates.loading:
			{
			connect();	// Initialize Sockets
			if (connected === true )
				appState = appStates.loaded;
			}
		break;

		case appStates.loaded:
			{
			if (!loadTweets === true)
				{

				}
			else
				appState = appStates.streaming;
			}
		break;

		case appStates.streaming:
			{

			}
		break;
		}
	}

/////////////////////////////////
// Network
// Network Data
var socket = {};					// Socket object
var connected = false;
var loadTweets = false;

function connect()
	{
	if (!connected)
		{
		socket = io.connect('localhost', {port:3000});
	 	connected = true;

		socket.on('connect', function (tweets)
			{
			//todo: Need to have the server send the latest 20 tweets on connect
			});

		socket.on('tweet', function (tweet)
			{
			tweetBuffer.unshift(tweet);	// Add the tweet to the Buffer
			manageBufferLength(); 			// Make sure we don't break the tweet buffer
			});
		}
	}

////////////////////////////////
// Twitter Management
var tweetBuffer = [];
var maxBufferSize = 50;
var maxTweetListSize = 10;

function manageBufferLength()
	{
	if (tweetBuffer.length > maxBufferSize)
		{
		tweetBuffer.pop();
		if (tweetBuffer.length > maxBufferSize)
			manageBufferLength(); // Recursively remove all extra tweets
		}
	}

function trimTweetList()
	{
	debugger;
	var length = $('li').size();
	if (length > maxTweetListSize)
		{
		$('ul#tweetList li:last').fadeOut('slow', function()
			{
			$(this).remove();
			});
		trimTweetList();
		}
	}

function updateTweets()
	{
	var listRef = $('ul#tweetList'); // get a reference to the tweet list
	var first = 0;
	var speed = 700;
	var pause = 3000;

	for (var x = 0; x < tweetBuffer.length; x++)
		{
		//tweet.text
		var tweet = tweetBuffer[x].text;
		var created =  parseDate(tweetBuffer[x].created_at);
		var createdDate = created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()+' at '+created.getHours()+':'+created.getMinutes();

		tweet = tweet.parseURL().parseUsername().parseHashtag();
		var newEntry = $("<li><div class='tweet'>" + tweet + "</div></li>").hide();

		listRef.prepend(newEntry);
		newEntry.fadeIn('slow');
		}
	tweetBuffer = []; // Clear tweet buffer
	}

/////////////////////////////////
// Prototype Extensions - thanks to http://www.simonwhatley.co.uk/parsing-twitter-usernames-hashtags-and-urls-with-javascript
String.prototype.parseURL = function()
	{
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url)
	{
	return url.link(url);
	});
	};

String.prototype.parseUsername = function()
	{
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u)
	{
	var username = u.replace("@","")
	return u.link("http://twitter.com/"+username);
	});
	};

String.prototype.parseHashtag = function()
	{
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t)
	{
	var tag = t.replace("#","%23")
	return t.link("http://search.twitter.com/search?q="+tag);
	});
	};

function parseDate(str)
	{
	var v=str.split(' ');
	return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
	}

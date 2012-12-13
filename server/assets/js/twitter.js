/**
 *
 * Project: Infinite Desktop
 * Created by: bbjorklund
 * Date: 12/12/12
 * Copyright 2011 Gas Powered Games Corp. All rights reserved.
 */

/////////////////////////////////
// Tweet Management
// Tweet Data
var tweets = []; 					// Array of the latest tweets
var tweetsTwo = [];				// array of new tweets to be displayed
var tweetDivPosition = 1; // If true, the 'tweets' array is being displayed first, if false, the tweetsTwo is displayed first

var tweetBuffer = []; 		// Placeholder array for tweets
var maxTweetBuffer = 60;	// Maximum tweets we will store for the client
var maxUserTweetDisplay = 50; // Maximum number of tweets displayed

/////////////
// Helper Functions
function addTweetsToDOM(tweetDiv)
	{
	for (var i = 0; i < tweetArray.length; i++)
		{
		var tweet = tweetArray[i].text;
		var created = parseDate(tweetArray[i].created_at);
		var createdDate = created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()+' at '+created.getHours()+':'+created.getMinutes();

		tweet = tweet.parseURL().parseUsername().parseHashtag();
		$("#twitter-feed").append('<p>'+tweet+'</p>');
		}
	}

// checkTweetList() - Checks the tweet list, and if it exceeds the number of allowed tweets, trim it
function checkTweetList()
	{
	// First Make sure the buffer isn't overflowing
	if (tweets.length > maxUserTweetDisplay)
		{
		tweetBuffer.pop();

		if (tweets.length > maxUserTweetDisplay)	// Recursive, hopefully this doesn't happen too often
			checkTweetList();
		}
	}

// shiftBufferToTweets() - Move all tweets from the buffer to the tweet list, and adds them to the DOM
function copyTweetBuffer()
	{
	var selector = $('#twitter-feed');
	selector.hide("slide", {direction: "down"}, 1000); // Hide all the tweets
	selector.html(""); // clear all the contents
	checkTweetList();     // Make sure there aren't more than we can display
	addTweetsToDOM(); 		// Now render the tweets
	}

function loadLatestTweets()
	{
	/////////////////////////////
	/// Entry Point
	if (tweetDivPosition === 1)
		{

		}
	else
		{

		}
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

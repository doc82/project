/**
 *
 * Project: Infinite Desktop
 * Created by: bbjorklund
 * Date: 12/12/12
 * Copyright 2011 Gas Powered Games Corp. All rights reserved.
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
		socket = io.connect('172.16.20.80', {port:3000});
	 	connected = true;

		socket.on('connect', function (tweets)
			{
			//todo: Need to have the server send the latest 20 tweets on connect
			});

		socket.on('tweet', function (tweet)
			{
			tweetBuffer.unshift(tweet);	// Add the tweet to the Buffer
			});
		}
	}

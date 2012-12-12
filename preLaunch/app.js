/**
 *
 * Project: Get Hired
 * Created by: Bruce Bjorklund
 * Date: 12/12/12
 */


// for reference: https://github.com/gradus/flatiron-example
// Server Modules
var express = require('express')
	, connect = require('connect')
	, http = require('http')
	, path = require('path')
	, fs = require('fs');

//////////////////////////////
// Custom Modules
var twit= require('./lib/twitter');
var user= require('./lib/user');

var app = express(); // Reference to Express Server
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// Configure Express
app.configure(function()
	{
	app.set('views', __dirname + '/views'); 	// Directory of the views
	app.set('view engine', 'jade');
	app.use(express.favicon());     					// Set the icon for the webpage.. todo: need to fix this
	app.use(express.logger('dev')); 					// set logging to development mode
	app.use(express.bodyParser()); 						// Parses the request bodies
	app.use(express.methodOverride()); 				// support _method (PUT in forms etc) todo: I need to actually understand this
	app.use(app.router);        							// Use Expression routes
	app.use(connect.compress());
	app.use(express.static(__dirname + '/assets',{maxAge: 31557600000})); // Static file server directory name
	app.use(function(req, res, next)  				// Add a 404 error
		{
		res.render('404', { title: 'Project Mercury' });
		});
	});

// Session Management
// Note:I will need to implement a better session management system if the server needs to be scaled
// Clients are not 'authorized' until their socket ID is added to this object

var connections = 0;

io.set('log level', 1); // reduce logging
io.sockets.on('connection', function(socket)
	{
	connections++;
	socket.on('disconnect', function() // Disconnect Logic
	{
	if (clients[socket.id]) // if the client exists in the 'authorized' list, then remove them
		{
		var tmpUser = clients[socket.id];
		console.log("Authorized user: "+ socket.id + "  Disconnected");
		delete clients[socket.id];
		galaxy.removePlayerGalaxy(tmpUser,socket.id); // remove the user from the galaxy
		return;
		}
	console.log("Un-authorized user: " + socket.id + " disconnected");
	connections--;
	});
	});

// Environment Configuration
app.configure('development', function()
	{
	app.use(express.errorHandler());
	});

////////////////////////////////
// HTTP Router

// Index
app.get('/', function (req, res)
	{
	res.render('index');
	});




